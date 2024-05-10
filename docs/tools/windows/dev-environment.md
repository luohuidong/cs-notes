# 开发环境配置

PowerShell 管理员模式安装[Scoop](https://scoop.sh/)

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

通过 Scoop 安装开发环境：

```powershell
scoop bucket add extra
scoop install git nodejs-lts pnpm go mingw python vscode
```
