module.exports = {
  apps : [
      {
        name: "sdm-backend",
        script: "npm",
        args: "start",
        watch: true,
        time: true,
        log_date_format: "YYYY-MM-DD HH:mm Z",
        ignore_watch: ["node_modules"]
      }
  ]
}