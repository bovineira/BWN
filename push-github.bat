@echo off
echo ========================================
echo PUSH PARA GITHUB - BWN
echo ========================================
echo.

echo Verificando status do git...
git status
echo.

echo Adicionando todas as alteracoes...
git add -A
echo.

echo Fazendo commit...
git commit -m "feat: adiciona campo nicho ao formulario BWN"
echo.

echo Configurando remote...
git remote set-url origin https://github.com/bovineira/BWN.git
echo.

echo Fazendo push para GitHub...
git push -u origin main
echo.

echo ========================================
echo PUSH CONCLUIDO!
echo ========================================
pause

