export function slugify(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function generateUniqueSlug(Model, name, excludeId = null) {
  const base = slugify(name) || "product";
  let slug = base;
  let counter = 1;

  while (true) {
    const query = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const exists = await Model.findOne(query);
    if (!exists) {
      return slug;
    }

    slug = `${base}-${counter}`;
    counter += 1;
  }
}
