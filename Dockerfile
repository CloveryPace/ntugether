FROM node:20.11-alpine

# 設定工作目錄
WORKDIR /app/react-sample

# 複製應用程式源碼到容器中
COPY ./app/react-sample ./

# 安裝依賴
RUN npm install --legacy-peer-deps

# 暴露應用程式埠（如果需要）
EXPOSE 3000

# 設定容器啟動命令
CMD ["npm", "start"]
