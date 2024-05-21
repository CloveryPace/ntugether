module.exports = {
  apps : [
      {
        name: "sdm-backend",
        script: "./index.js",
        watch: true,
        time: true,
        log_date_format: "YYYY-MM-DD HH:mm Z",
        ignore_watch: ["node_modules"]
      }
  ]
}