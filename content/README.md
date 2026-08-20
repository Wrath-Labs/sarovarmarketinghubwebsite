# Edit the website here

Five files, no code:

- **site.json** — brand, navigation, contact details, socials, footer, SEO
- **theme.json** — colours, fonts, spacing, animation switches
- **home.json** — the whole home page (and `sectionOrder` controls the layout)
- **services.json** — the /services page
- **contact.json** — the /contact page, including every form field

Rules of thumb:

1. Only change what is inside the **quotes**. Leave the `"key":` names alone.
2. Every `,` and `}` matters. If the site shows an error after an edit, you
   probably removed or added a comma. Paste the file into
   <https://jsonlint.com> to find it.
3. To add another card, service, testimonial or FAQ, copy an entire `{ … }`
   block (including its comma) and edit the copy.
4. Images take either `/images/your-file.jpg` (put the file in
   `public/images/`) or a full `https://…` URL.
5. Keys named `_comment` are just notes. Deleting them changes nothing.

See the main `README.md` for the full guide.
