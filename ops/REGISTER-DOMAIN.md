# Registering sproutwellaba.com and pointing it at Vercel

Checked 2026-09-07: `sproutwellaba.com` is **AVAILABLE at $12.00 USD/year**
through Google Cloud Domains. Billing account `0110EA-7864C1-D88133`
("My Billing Account") is open and linked to both existing projects.

## 1. Fill in the contact data

Copy `domain-contacts.example.yaml` to `domain-contacts.yaml` and fill it in.
It needs a real email, phone, and postal address — ICANN requires accurate
registrant data and can cancel a domain registered with false details.
`--contact-privacy=private-contact-data` keeps them out of public WHOIS.

## 2. Dry run first

```sh
export CLOUDSDK_PYTHON=/opt/homebrew/bin/python3.11
gcloud domains registrations register sproutwellaba.com \
  --project=<PROJECT_ID> \
  --account=yechielgartenhaus@gmail.com \
  --contact-data-from-file=ops/domain-contacts.yaml \
  --contact-privacy=private-contact-data \
  --yearly-price="12.00 USD" \
  --cloud-dns-zone=sproutwell-aba \
  --validate-only
```

`--validate-only` charges nothing. Only drop that flag once it passes.

Decide the project first — the two that exist are `offendersearch-prod` and
`project-871ea766-3e66-4439-801`. Neither is a natural home for this; a new
one (e.g. `sproutwell-aba`) keeps the billing legible.

## 3. Register (this charges $12)

Same command without `--validate-only`. Goes to REGISTRATION_PENDING, then
ACTIVE within about five minutes.

## 4. Point it at Vercel

Add the domain to the Vercel project:

```sh
npx vercel domains add sproutwellaba.com --scope yechielgartenhaus-6390
```

Vercel prints the records it wants — normally an A record on the apex to
`76.76.21.21` and a CNAME on `www` to `cname.vercel-dns.com`. Verify against
what Vercel actually prints; do not trust these values from a doc. Then create
them in the Cloud DNS zone:

```sh
gcloud dns record-sets create sproutwellaba.com. --type=A --ttl=3600 \
  --rrdatas=<A_RECORD_FROM_VERCEL> --zone=sproutwell-aba
gcloud dns record-sets create www.sproutwellaba.com. --type=CNAME --ttl=3600 \
  --rrdatas=cname.vercel-dns.com. --zone=sproutwell-aba
```

## 5. Flip the site out of noindex — THIS IS THE STEP THAT MATTERS

The site currently ships `noindex` and a disallow-all `robots.txt` on purpose,
because it has been running on a temporary Vercel URL. Setting the real origin
is what turns indexing on:

```sh
npx vercel env add NEXT_PUBLIC_SITE_URL production   # https://sproutwellaba.com
npx vercel deploy --prod --yes
```

Then confirm:

```sh
curl -s https://sproutwellaba.com/robots.txt        # expect Allow: / + 52 sitemaps
curl -s https://sproutwellaba.com/ | grep canonical # expect the real domain
```

Until that env var is set, the site stays invisible to search engines no
matter which domain points at it.
