import { NextResponse, type NextRequest } from "next/server";
import z from "zod";
import { env } from "~/env";
import { adjectives, nouns } from "~/lib/words";

export async function proxy(req: NextRequest) {
  const subdomain = extractSubdomain(req);

  if (!subdomain || req.nextUrl.pathname.includes("/api"))
    return NextResponse.next();

  const { rewrite, domain } = subdomain;

  if (domain.trim().length > 0) {
    const url = req.nextUrl.clone();

    url.pathname = `/${domain}${url.pathname}`;

    if (rewrite) return NextResponse.rewrite(url);
    else {
      const pathParts = req.nextUrl.pathname.slice(1).split("/");
      const remainingPath = pathParts.slice(1).join("/");

      const url = new URL(
        `${env.NODE_ENV === "development" ? "http://" : "https://"}${domain}.${env.ROOT_DOMAIN}/${remainingPath}`,
      );

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};

function extractSubdomain(req: NextRequest) {
  const hostname = req.headers.get("host") ?? "";
  const isIp = isIpAddress(hostname.split(":")?.[0] ?? "");

  if (isIp) return null;

  const subdomain = hostname.split(".")[0];

  if (subdomain && subdomain !== env.ROOT_DOMAIN && subdomain.trim().length > 0)
    return { rewrite: true, domain: subdomain };

  const org = req.nextUrl.pathname.slice(1).split("/")[0];

  if (org && isValidSlug(org)) return { rewrite: false, domain: org };

  return null;
}

const IpSchema = z.ipv4();

function isIpAddress(subdomain: string) {
  return IpSchema.safeParse(subdomain).success;
}

function isValidSlug(slug: string) {
  const parts = slug.split("-");

  // Must have exactly 5 parts: adjective-noun-number-climate-bear
  if (parts.length !== 5) return false;

  const [adjective, noun, number, climate, bear] = parts;

  return (
    adjectives.includes(adjective!) &&
    nouns.includes(noun!) &&
    number!.length === 3 &&
    /^\d+$/.test(number!) &&
    climate === "climate" &&
    bear === "bear"
  );
}
