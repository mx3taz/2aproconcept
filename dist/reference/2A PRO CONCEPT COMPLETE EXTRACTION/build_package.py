import os, json, csv, re, shutil, subprocess
from PIL import Image
from pathlib import Path

base=Path('/mnt/data/dapepe_extract')
orig=Path('/mnt/data/STRUCTURE 2A (1).pdf')
# Rename/copy images logically, preserving original bytes
maps={
1:[('logo','image-000.jpg')],
2:[('abri_standard_polycarbonate','image-001.jpg'),('abri_standard_pvc','image-002.jpg'),('abri_standard_toile_pvc','image-003.jpg'),('abri_standard_panneaux_sandwich','image-004.jpg'),('abri_suspendu_polycarbonate','image-005.jpg'),('abri_suspendu_pvc','image-006.jpg'),('abri_suspendu_toile_pvc','image-007.jpg'),('abri_suspendu_panneaux_sandwich','image-008.jpg')],
3:[('abri_ouvrant_manuelle','image-009.jpg'),('abri_ouvrant_auto_1','image-010.jpg'),('abri_ouvrant_auto_2','image-011.jpg'),('abri_ouvrant_auto_3','image-012.jpg'),('abri_ouvrant_auto_4','image-013.jpg')],
4:[('abri_terrace_1','image-014.jpg'),('abri_terrace_2','image-015.jpg'),('pergola_1','image-016.jpg'),('pergola_2','image-017.jpg')],
5:[('extension_aluminium_1','image-018.jpg'),('extension_tole_1','image-019.jpg'),('extension_acier_1','image-020.jpg'),('extension_tole_2','image-021.jpg'),('extension_aluminium_2','image-022.jpg')],
6:[('garde_corps_tubes_1','image-023.jpg'),('garde_corps_verre_1','image-024.jpg'),('garde_corps_tubes_2','image-025.jpg'),('garde_corps_tubes_3','image-026.jpg'),('garde_corps_verre_2','image-027.jpg')],
7:[('menuiserie_1','image-028.jpg'),('menuiserie_2','image-029.jpg'),('menuiserie_3','image-030.jpg'),('menuiserie_4','image-031.jpg'),('menuiserie_5','image-032.jpg'),('menuiserie_6','image-033.jpg'),('menuiserie_7','image-034.jpg'),('menuiserie_8','image-035.jpg')],
8:[('enseigne_facade_1','image-036.jpg'),('enseigne_facade_2','image-037.jpg'),('enseigne_facade_3','image-038.jpg'),('enseigne_facade_4','image-039.jpg'),('enseigne_facade_5','image-040.jpg')]
}
emb=base/'embedded_images_original'; emb.mkdir(exist_ok=True)
records=[]
for page,items in maps.items():
    for idx,(name,src) in enumerate(items,1):
        s=base/src; dest=emb/f'p{page:02d}_{idx:02d}_{name}.jpg'
        shutil.copy2(s,dest)
        with Image.open(s) as im:
            records.append({'page':page,'order_on_page':idx,'name':name,'filename':dest.name,'format':im.format,'width_px':im.width,'height_px':im.height,'source_object':src})

# Exact extracted text (from pdftotext -layout)
text=(base/'text_layout.txt').read_text(encoding='utf-8')
(base/'extracted_text_exact.txt').write_text(text,encoding='utf-8')

# Structured transcription: preserve source wording, punctuation and apparent typos; do not silently correct.
pages=[
{'page':1,'title':'2A PRO CONCEPT','content':['Conception, fabrication et installation de solutions métalliques et aluminium sur mesure.','Nos principaux domaines d’activité :','Abris de voitures','Abris de terrasses','Abris ouvrants','Extensions de terrasses','Pergola','Garde-corps et rampes en inox','Menuiserie aluminium','Enseigne et habillage de façades']},
{'page':2,'title':'Deux types d’abri de voiture :','content':['Conception fabrication et pose d’abris de voitures sur mesure, adaptés aux dimensions et aux besoins du client (structure galvanisé/alu, peinture epoxy au four/au pistolet, forme plat/arrondi, …)','1 Abri standard','Abris avec une structure en poteaux et traverse','COUVERTURE POLYCARBONATE','COUVERTURE PVC','COUVERTURE TOILE PVC','COUVERTURE PANNEAUX SANDWICH','2 abri suspendu','Abris avec une structure permettant de réduire ou supprimer les poteaux frontaux.','POLYCARBONATE','PVC','TOILE PVC','PANNEAUX SANDWICH']},
{'page':3,'title':'Abri ouvrant :','content':['Conception, fabrication et pose d’abris ouvrant de maison arabe, terace, … sur mesure, adaptés aux dimensions et aux besoins du client (étanchéité complète, ouverture sur une seule partie /ouverture sur plusieurs modules, structure galvanisé/alu, peinture epoxy au four/au pistolet, forme plat/arrondi, avec canalisation d’eaux/ sans canalisation, couverture au choix…)','Abri ouvrant manuelle','Abri ouvrant automatique','Système coulissant à ouverture manuelle par poussée','Système coulissant à ouverture automatique (motorisé)','Système de commande pour l’ouverture motorisée'],'links':['https://www.facebook.com/reel/1115045120332752','https://www.facebook.com/reel/1938668216515914','https://www.facebook.com/reel/1502094547729012','https://www.facebook.com/reel/1388941635011908']},
{'page':4,'title':'Abri de terrace :','content':['Conception fabrication et pose d’abris de terace sur mesure, adaptés aux dimensions et aux besoins du client (étanchéité complète, structure galvanisé/alu, peinture epoxy au four/au pistolet, forme plat/arrondi, couverture au choix …)','Pergola :','Conception fabrication et pose de pergola en acier galvanisée ou en aluminium couverture au choix']},
{'page':5,'title':'Extension :','content':['Conception fabrication et pose d’extension de tercae maison, terace café, séparation,….','Remplissage en tout types de verres, panneaux sandwich, pvc, ….','En aluminium en tôle en acier','Structure en aluminium (fixe, ouvrant, coulissant)','Remplissage au choix','Extension en tôle galvanisée','Dimension au besoin du client','Découpe laser 5moif selon le choix','Structure en acier galvanisée','Peinture au choix','Remplissage au choix']},
{'page':6,'title':'GARDE-CORPS & RAMPES EN INOX :','content':['Conception et fabrication de garde-corps en acier inoxydable pour escaliers, balcons, terrasses','Garde-corps à tubes inox','Montants verticaux','Lisses horizontales','Main courante','Garde-corps avec remplissage en verre','Structure inox','Poteaux inox','Main courante inox','Verre de sécurité','Fixations adaptées']},
{'page':7,'title':'Menuiserie aluminium :','content':['Fabrication et installation de menuiseries aluminium sur mesure : fenêtre, porte, porte Fenetre, moustiquaire, volet roulant','(Fixe, coulissant, à la française et battantes) , remplissage au besoin du client']},
{'page':8,'title':'Enceigne set habillage de façades :','content':['Conception et réalisation d’enseignes, habillages et décorations de façades en panneaux aluminium composite (Alucobond), avec découpe laser de motifs et logos sur mesure.'],'links':['https://www.facebook.com/reel/759911303797921','https://www.facebook.com/reel/1384028242747260']},
{'page':9,'title':'','content':[],'note':'Blank page in the PDF; no extracted text or embedded images.'}
]
package={'source_file':'STRUCTURE 2A (1).pdf','pdfinfo':{'pages':9,'page_size_points':'841.92 x 595.32','creator':'Microsoft® Word LTSC','producer':'Microsoft® Word LTSC'},'extraction_notes':['Text preserved from the PDF without silent spelling/grammar correction.','Embedded JPEG images were copied byte-for-byte from the PDF using direct image-object extraction.','Page 9 is blank.','The PDF contains 41 embedded images total: 1 logo + 40 content photos.'],'pages':pages,'images':records}
(base/'structured_content.json').write_text(json.dumps(package,ensure_ascii=False,indent=2),encoding='utf-8')
with (base/'image_manifest.csv').open('w',newline='',encoding='utf-8-sig') as f:
 w=csv.DictWriter(f,fieldnames=records[0].keys()); w.writeheader(); w.writerows(records)

# Create a README
readme='''2A PRO CONCEPT — COMPLETE EXTRACTION\n\nContents:\n- extracted_text_exact.txt: text extracted in page order, preserving source wording.\n- structured_content.json: page-by-page structured transcription + image metadata + links.\n- image_manifest.csv: every embedded image with page/order/name/pixel dimensions.\n- embedded_images_original/: original JPEG image objects extracted directly from the PDF (no screenshot/upscale/re-encode).\n- contact_sheet.jpg: visual index of all extracted images.\n\nImportant: The source PDF has 9 PDF pages according to its internal structure. Page 9 is blank. There are 41 embedded JPEG images total.\n'''
(base/'README.txt').write_text(readme,encoding='utf-8')

# zip package
zip_path=Path('/mnt/data/2A_PRO_CONCEPT_COMPLETE_EXTRACTION.zip')
if zip_path.exists(): zip_path.unlink()
shutil.make_archive('/mnt/data/2A_PRO_CONCEPT_COMPLETE_EXTRACTION','zip','/mnt/data','dapepe_extract')
print(zip_path)
print('images',len(records))
print('dimensions',sum(r['width_px']*r['height_px'] for r in records))
