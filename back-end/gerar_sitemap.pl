<?php
// includes/gerar_sitemap.php
header('Content-type: application/xml');
echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

echo '<url><loc>http://seusite.com/</loc><lastmod>' . date('Y-m-d') . '</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>';
echo '<url><loc>http://seusite.com/servicos.html</loc><lastmod>' . date('Y-m-d') . '</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>';
echo '<url><loc>http://seusite.com/produtos.html</loc><lastmod>' . date('Y-m-d') . '</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>';
echo '<url><loc>http://seusite.com/contato.html</loc><lastmod>' . date('Y-m-d') . '</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>';
echo '<url><loc>http://seusite.com/parceiros.html</loc><lastmod>' . date('Y-m-d') . '</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>';
echo '<url><loc>http://seusite.com/ajuda.html</loc><lastmod>' . date('Y-m-d') . '</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>';
echo '<url><loc>http://seusite.com/configuracoes.html</loc><lastmod>' . date('Y-m-d') . '</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>';

echo '</urlset>';
?>