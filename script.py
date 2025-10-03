# Leer el archivo HTML para analizar su estructura y contenido
with open('k_messe_2025_agenda_de_viaje_html-2.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Mostrar las primeras líneas para ver la estructura
print("Primeras 2000 caracteres del archivo HTML:")
print(html_content[:2000])
print("\n" + "="*50 + "\n")

# Buscar elementos específicos del HTML
import re

# Extraer título
title_match = re.search(r'<title>(.*?)</title>', html_content, re.IGNORECASE)
if title_match:
    print(f"Título: {title_match.group(1)}")

# Contar elementos principales
nav_count = len(re.findall(r'<nav[^>]*>', html_content, re.IGNORECASE))
section_count = len(re.findall(r'<section[^>]*>', html_content, re.IGNORECASE))
div_count = len(re.findall(r'<div[^>]*>', html_content, re.IGNORECASE))
img_count = len(re.findall(r'<img[^>]*>', html_content, re.IGNORECASE))
button_count = len(re.findall(r'<button[^>]*>', html_content, re.IGNORECASE))

print(f"\nElementos principales:")
print(f"- Navegación: {nav_count}")
print(f"- Secciones: {section_count}")
print(f"- Divs: {div_count}")
print(f"- Imágenes: {img_count}")
print(f"- Botones: {button_count}")

# Buscar CSS embebido
css_match = re.search(r'<style[^>]*>(.*?)</style>', html_content, re.DOTALL)
if css_match:
    print(f"\nCSS encontrado (primeros 500 caracteres):")
    print(css_match.group(1)[:500])

# Buscar JavaScript embebido
js_matches = re.findall(r'<script[^>]*>(.*?)</script>', html_content, re.DOTALL)
if js_matches:
    print(f"\nJavaScript encontrado ({len(js_matches)} bloques)")
    for i, js in enumerate(js_matches):
        if js.strip():  # Solo mostrar scripts con contenido
            print(f"Script {i+1} (primeros 200 caracteres):")
            print(js[:200])