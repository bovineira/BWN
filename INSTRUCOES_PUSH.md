# Instruções para Fazer Push no GitHub

## Problema Identificado
O terminal não está retornando output dos comandos git, o que pode indicar um problema de autenticação ou configuração.

## Solução 1: Executar o Script Batch

1. **Execute o arquivo `push-github.bat`** que foi criado na raiz do projeto
   - Clique duas vezes no arquivo `push-github.bat`
   - Ou execute no terminal: `.\push-github.bat`

## Solução 2: Comandos Manuais

Abra o PowerShell ou Git Bash na pasta do projeto e execute:

```bash
# 1. Verificar status
git status

# 2. Adicionar todas as alterações
git add -A

# 3. Fazer commit
git commit -m "feat: adiciona campo nicho ao formulario BWN"

# 4. Configurar remote (se necessário)
git remote set-url origin https://github.com/bovineira/BWN.git

# 5. Fazer push
git push -u origin main
```

## Solução 3: Se Pedir Autenticação

Se o Git pedir credenciais:

1. **Use um Personal Access Token (recomendado)**:
   - Vá em: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Crie um novo token com permissões `repo`
   - Use o token como senha quando pedir

2. **Ou configure o Git Credential Manager**:
   ```bash
   git config --global credential.helper manager-core
   ```

## Verificação

Após o push, verifique no GitHub:
- https://github.com/bovineira/BWN

## Alterações que Devem Estar no Commit

- Campo `nicho` adicionado ao estado do formulário
- Input "Nicho" na primeira etapa
- Validação do campo nicho
- Placeholder com exemplos

