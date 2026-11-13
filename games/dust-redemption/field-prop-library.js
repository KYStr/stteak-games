import { createFieldProp } from "./field-props.js";

// Lazy, bounded asset library: retain the six immutable mechanism meshes once.
// Every deployment receives independent transforms, metadata and materials;
// collision/raycast geometry remains the original, full-resolution asset.
export class FieldPropLibrary {
  constructor(graphics) {
    this.graphics = graphics;
    this.templates = new Map();
    this.geometries = new Set();
  }
  create(kind) {
    let template = this.templates.get(kind);
    if (!template) {
      template = createFieldProp(kind, this.graphics);
      this.templates.set(kind, template);
      template.traverse((node) => {
        if (node.geometry) this.geometries.add(node.geometry);
      });
    }
    const object = template.clone(true),
      materials = new Map();
    const own = (material) => {
      if (!materials.has(material)) materials.set(material, material.clone());
      return materials.get(material);
    };
    object.traverse((node) => {
      if (!node.material) return;
      node.material = Array.isArray(node.material)
        ? node.material.map(own)
        : own(node.material);
    });
    return object;
  }
  dispose() {
    const materials = new Set();
    for (const template of this.templates.values())
      template.traverse((node) => {
        if (Array.isArray(node.material))
          for (const material of node.material) materials.add(material);
        else if (node.material) materials.add(node.material);
      });
    for (const geometry of this.geometries) geometry.dispose();
    for (const material of materials) material.dispose();
    this.geometries.clear();
    this.templates.clear();
  }
}
