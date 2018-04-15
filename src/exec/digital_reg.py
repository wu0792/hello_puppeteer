import sys
import pytesseract
from PIL import Image

args = sys.argv

img = Image.open(args[1])
str = pytesseract.image_to_string(img, lang='chi_sim', config='-psm 7 -c tessedit_char_whitelist=0123456789')
print(str)
