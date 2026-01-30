const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "../schemas/article.json");
const outputDir = path.join(
  __dirname,
  "../src/api/article/content-types/article"
);

const input = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

function parseField(def) {
  const field = {};

  if (def.endsWith("!")) {
    field.required = true;
    def = def.slice(0, -1);
  }

  field.type = def;
  return field;
}

const attributes = {};
for (const [name, def] of Object.entries(input.fields)) {
  attributes[name] = parseField(def);
}

const strapiSchema = {
  kind: "collectionType",
  collectionName: `${input.name}s`,
  info: {
    singularName: input.name,
    pluralName: `${input.name}s`,
    displayName: input.name[0].toUpperCase() + input.name.slice(1)
  },
  options: {
    draftAndPublish: true
  },
  attributes
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, "schema.json"),
  JSON.stringify(strapiSchema, null, 2)
);

console.log("✅ Strapi schema generated");
