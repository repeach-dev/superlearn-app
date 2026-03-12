import os
import re

def snake_to_pascal(name):
    return ''.join(word.capitalize() for word in name.split('_'))

def clean_svg_content(content):
    # 1. Recovery: Fix broken attributes from previous buggy runs
    content = content.replace('stroke-width="2"linecap', 'stroke-width="2" stroke-linecap')
    content = content.replace('stroke-width="2"linejoin', 'stroke-width="2" stroke-linejoin')
    content = re.sub(r'\bstroke-\s+', ' ', content)
    
    # 2. Colors: Normalize hex colors to currentColor
    content = re.sub(r'fill="#[A-Fa-f0-9]{3,6}"', 'fill="currentColor"', content)
    content = re.sub(r'stroke="#[A-Fa-f0-9]{3,6}"', 'stroke="currentColor"', content)
    
    # 3. Handle Size and ViewBox
    match = re.search(r'<svg([^>]*)>', content)
    if match:
        tag_content = match.group(1)
        
        # Check if viewBox exists
        vb_match = re.search(r'viewBox="[^"]*"', tag_content)
        
        # If viewBox is missing, we need to add it.
        # Fallback to 0 0 24 24 if we can't find original dimensions
        if not vb_match:
            # Try to find original width/height if they still exist
            w_match = re.search(r'width="([0-9]+)(?:px)?"', tag_content)
            h_match = re.search(r'height="([0-9]+)(?:px)?"', tag_content)
            
            if w_match and h_match:
                width = w_match.group(1)
                height = h_match.group(1)
                tag_content += f' viewBox="0 0 {width} {height}"'
            else:
                # Default for most icon sets like Mingcute
                tag_content += ' viewBox="0 0 24 24"'
        
        # Remove width and height from the tag (after using them for viewBox if needed)
        tag_content = re.sub(r'\s+width="[^"]*"', '', tag_content)
        tag_content = re.sub(r'\s+height="[^"]*"', '', tag_content)
        
        # Reconstruct the svg tag
        new_tag = f'<svg{tag_content}>'
        content = content.replace(match.group(0), new_tag)
    
    # 4. Final Cleanup: Normalize spaces
    content = re.sub(r'\s+', ' ', content).strip()
    return content

def generate_icons():
    # Define paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    assets_root = os.path.abspath(os.path.join(base_dir, "../../../assets/icons/mingcute"))
    default_root = os.path.abspath(os.path.join(base_dir, "../../../assets/icons/default"))
    output_file = os.path.join(base_dir, "mingcute.ts")
    
    # Process both directories for cleaning
    for d in [assets_root, default_root]:
        if not os.path.exists(d): continue
        for root, _, files in os.walk(d):
            for file in files:
                if file.endswith(".svg"):
                    full_path = os.path.join(root, file)
                    with open(full_path, "r", encoding="utf-8") as f:
                        content = f.read()
                    
                    cleaned = clean_svg_content(content)
                    
                    if content != cleaned:
                        with open(full_path, "w", encoding="utf-8") as f:
                            f.write(cleaned)

    exports = []
    
    for root, dirs, files in os.walk(assets_root):
        for file in sorted(files):
            if file.endswith(".svg"):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, base_dir)
                
                # Create the export name
                name_without_ext = os.path.splitext(file)[0]
                pascal_name = snake_to_pascal(name_without_ext)
                export_name = f"Mc{pascal_name}Icon"
                
                import_path = rel_path.replace(os.sep, '/')
                exports.append(f"export {{ default as {export_name} }} from '{import_path}';")

    with open(output_file, "w", encoding="utf-8") as f:
        f.write("\n".join(exports) + "\n")
    
    print(f"Generated {output_file} with {len(exports)} icons and cleaned SVGs with guaranteed viewBox.")

if __name__ == "__main__":
    generate_icons()
