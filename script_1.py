# Analizar más detalles del HTML
print("Analizando estructura completa del archivo HTML...\n")

# Buscar más detalles sobre la estructura y características
# Extraer más información específica

# Buscar clases CSS personalizadas
class_matches = re.findall(r'class="([^"]*)"', html_content)
unique_classes = set()
for match in class_matches:
    unique_classes.update(match.split())

print("Clases CSS utilizadas (muestra de las principales):")
bavarian_classes = [cls for cls in unique_classes if 'bavarian' in cls.lower()]
font_classes = [cls for cls in unique_classes if 'font' in cls.lower() or 'text' in cls.lower()]
color_classes = [cls for cls in unique_classes if any(color in cls.lower() for color in ['blue', 'gold', 'cream', 'white'])]

print(f"- Clases bávaras: {bavarian_classes}")
print(f"- Clases de fuente: {font_classes[:10]}")  # Primeras 10
print(f"- Clases de color: {color_classes[:10]}")  # Primeras 10

# Buscar meta información
meta_matches = re.findall(r'<meta[^>]*name="([^"]*)"[^>]*content="([^"]*)"', html_content)
print("\nMeta información:")
for name, content in meta_matches:
    print(f"- {name}: {content}")

# Buscar enlaces externos (CDN, fuentes, etc.)
link_matches = re.findall(r'<link[^>]*href="([^"]*)"', html_content)
script_matches = re.findall(r'<script[^>]*src="([^"]*)"', html_content)

print("\nRecursos externos:")
print("Links:")
for link in link_matches:
    print(f"- {link}")
    
print("\nScripts:")
for script in script_matches:
    print(f"- {script}")

# Buscar variables CSS
css_vars = re.findall(r'--([^:}]+):[^;}]+', html_content)
print(f"\nVariables CSS encontradas:")
for var in set(css_vars):
    print(f"- --{var}")

# Buscar el contenido principal de datos JavaScript
js_data_match = re.search(r'const DATA = \{(.*?)\};', html_content, re.DOTALL)
if js_data_match:
    print(f"\nDatos JavaScript encontrados (estructura DATA)")
    data_content = js_data_match.group(1)[:1000]  # Primeros 1000 caracteres
    print(data_content)