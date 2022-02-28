const { reportService } = require('../services/index');

module.exports = {
  async saveReport(req,res) {
    try {
      const result = await reportService.saveReport(req.body)
      res.json({
          status: "success",
          result
      })         
    } catch (error) {
      console.log(error)
      res.status(400)
      res.json({
          status: "failed",
          message: error.message
      })
    }
  },
  async getReportsByType(req, res) {
    try {
      const {formType=''} = req.query
      const reports = await reportService.getReportByFormType(formType)
      res.json({
          status: "success",
          reports
      })         
    } catch (error) {
      console.log(error)
      res.status(400)
      res.json({
          status: "failed",
          message: error.message
      })
    }
  },
  async downloadReport(req, res) {
    try {
      const id = req.params.id
      const report = await reportService.downloadReport(id)
      res.attachment('output.xlsx')
      res.send(report)         
    } catch (error) {
      console.log(error)
      res.status(400)
      res.json({
          status: "failed",
          message: error.message
      })
    }
  }
}