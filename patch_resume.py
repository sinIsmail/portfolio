import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('resume.html', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Replace nav scroll handler with progress bar version
old_nav = "    // \u2500\u2500 Nav scroll shadow \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n    const nav = document.getElementById('nav');\n    window.addEventListener('scroll', () => {\n      nav.classList.toggle('nav--scrolled', window.scrollY > 20);\n    }, { passive: true });"

new_nav = "    // \u2500\u2500 Nav: scroll shadow + reading progress bar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n    const nav = document.getElementById('nav');\n    const progressBar = document.getElementById('nav-progress');\n    window.addEventListener('scroll', () => {\n      const scrollTop = window.scrollY;\n      const docH = document.documentElement.scrollHeight - window.innerHeight;\n      const pct = Math.min(100, (scrollTop / docH) * 100);\n      progressBar.style.width = pct + '%';\n      progressBar.setAttribute('aria-valuenow', Math.round(pct));\n      nav.classList.toggle('nav--scrolled', scrollTop > 20);\n    }, { passive: true });"

if old_nav in content:
    content = content.replace(old_nav, new_nav, 1)
    print('Nav handler replaced OK')
else:
    print('Nav handler NOT found - check manually')

# Fix 2: Remove duplicate hero name split block
old_split_marker = "    // \u2500\u2500 Hero name character split animation"
new_split_marker = "    // \u2500\u2500 Cursor"

# Find the block and replace
import re
pattern = r'    // \u2500\u2500 Hero name character split animation[\s\S]+?// \u2500\u2500 Cursor'
if re.search(pattern, content):
    content = re.sub(pattern, '    // \u2500\u2500 Cursor', content, count=1)
    print('Duplicate split removed OK')
else:
    print('Duplicate split pattern NOT found')

with open('resume.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('File saved.')
