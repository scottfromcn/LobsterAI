

- **你的仓库**：`scottfromcn/LobsterAI`
- **上游官方**：`netease-youdao/lobsterai`
- **分支**：`main`

全程**不会覆盖你写的定制代码**，只会把官方修复的 bug 合并进来。

# 👇 直接复制粘贴执行（按顺序）
## 第一步：进入你的项目目录
```bash
cd 你的LobsterAI项目文件夹
```

## 第二步：设置官方为上游（只做一次）
```bash
git remote add upstream https://github.com/netease-youdao/lobsterai.git
```

## 第三步：拉取官方最新代码
```bash
git fetch upstream
```

## 第四步：同步到你的 main 分支（最关键）
```bash
git checkout main
git rebase upstream/main
```

## 第五步：推送到你自己的 GitHub
```bash
git push origin main -f
```

---

# 🟢 如果出现冲突（别怕，正常）
Git 会停下来告诉你哪个文件冲突。
打开文件，你会看到：
```
（冲突开始标记）<<<<<<< HEAD
你自己写的定制代码
（分隔标记）=======
官方修复的 bug 代码
（冲突结束标记）>>>>>>> upstream/main
```

**你只需要：**
1. **保留你自己的代码**
2. **保留官方修复的代码**
3. **删掉 <<<<<<<、=======、>>>>>>> 这些标记**

然后执行：
```bash
git add .
git rebase --continue
```

重复直到没有冲突。

---

# ✅ 完成！
现在你的项目：
- **保留了你所有定制开发**
- **同步了官方所有最新 bug 修复**
- **分支干净、没有垃圾提交**
