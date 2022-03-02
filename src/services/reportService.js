const { db, Sequelize, Report, Form, User, Question } = require('../models/dbConfig');
const { Op } = require('@sequelize/core');
const XlsxPopulate = require('xlsx-populate');
const path = require('path');
const {formTypeEnum} = require('../enums/Enums');

const templateReport = path.join(__dirname, '../resources/report.xlsx');

module.exports = {
  async saveReport(data) {
    const res = await Report.create({
      formType: data.type,
      team: data.team.label,
      leader: data.profile.leader,
      driller: data.profile.driller,
      member1: data.profile.contributor1,
      member2: data.profile.contributor2,
      note: data.notes,
      score: 0,
      isActive: true,
      createdDate: data.createdAt,
      createdBy: data.createdBy.id
    })
    const score = await this._generateForm(data, res.id)
    Report.update({
      score: score
    }, {
      where: {
        id: res.id
      }
    })
    return Report.findOne({where:{id:res.id}})
  },
  async getReportById(id) {
    return Report.findOne({
      where: {
        id
      },
      attributes: ['id', 'formType', 'team', 'leader', 'driller',
        'member1', 'member2', 'note', 'score', 'createdDate'
      ],
      include: [{
        model: User,
        attributes: ['fullName']
      }]
    })
  },
  async getReportByFormType(formType) {
    return Report.findAll({
      where: {
        formType: {
          [Op.like]: `%${formType}%`
        }
      },
      order: [['createdDate', 'DESC']],
      attributes: ['id', 'formType', 'team', 'leader', 'driller',
        'member1', 'member2', 'note', 'score', 'createdDate'
      ],
      include: [{
        model: User,
        attributes: ['fullName']
      },
      {
        model: Form,
        attributes: ['questionId', 'isCheck'],
        include: [{
          model: Question,
          attributes: ['question'],
        }]
      }]
    })
  },
  async deleteReport(id) {
    const pdeleteReport = Report.destroy({
      where: {id}
    })
    const pdeleteForm = Form.destroy({
      where: {reportId: id}
    })
    await Promise.all([])
  },
  async downloadReport(id=1) {
    // const queryReport = `SELECT form_type, team, leader, driller, member1,
    //   member2, note, score, created_date,
    //   (SELECT full_name FROM users where id = reports.created_by)
    //   AS userName FROM reports reports
    //   WHERE reports.id = ${id}  
    // `
    // const queryForm = `SELECT questionId,
    //   isCheck as checklist FROM forms
    //   WHERE forms.reportId = ${id}  
    // `
    // const pResReport = db.query(queryReport, { type: Sequelize.QueryTypes.SELECT })
    // const pResForm = db.query(queryForm, { type: Sequelize.QueryTypes.SELECT })
    // const [resReport, resForm] = await Promise.all([pResReport, pResForm])
    // const report = resReport[0]
    // const forms = resForm

    const forms = Report.findAll({
      where: {
        formType: {
          id, isActive: true
        }
      },
      attributes: ['formType', 'team', 'leader', 'driller',
        'member1', 'member2', 'note', 'score', 'createdDate'
      ],
      include: [
        {
          model: Form,
          attributes: ['id', 'isCheck'],
          include: [{
            model: Question,
            attributes: ['question'],
          }]
        }
      ]
    })

    const sheetName = 'Sheet1'
    const dataKeyReport = 'report'
    const startIndex = 15

    const workBook = await XlsxPopulate.fromFileAsync(templateReport)

    let columnName
    let rowName
    forms.forEach((row, index) => {
      let rowIndex = parseFloat(startIndex) + parseFloat(index)
      Object.keys(row).forEach((key) => {
        let value = row[key];
        if (key === 'question') {
          const range = workBook.sheet(sheetName).range(`A${rowIndex}:D${rowIndex}`);
          range.value(value);
          range.merged(true);
          range.style('wrapText', true);
          range.style('border', true);
        }
        if (key === 'checklist') {
          const range = workBook.sheet(sheetName).cell(`E${rowIndex}`).value(value !== null ? value === 1 ? 'Yes' : 'No' : '');
          range.style({horizontalAlignment: "center", verticalAlignment: "center", })
          range.style('border', true);
        }
      })
    })

    columnName = ''
    rowName = ''
    Object.keys(report).forEach((key) => {
      let value = report[key];
      let defineName = `${dataKeyReport}.${key}`
      if (key === 'user') {
        key = 'fullName'
        value = report[user][key];
        defineName = `${dataKeyReport}.${key}`
      }
      if (key === 'form_type') {
        value = formTypeEnum[value]
      }
      let wBookDefineName = workBook.definedName(defineName)
      if(wBookDefineName && wBookDefineName.columnName() ){
        columnName = wBookDefineName.columnName();
        rowName = wBookDefineName.rowNumber();
      }
      workBook.sheet(sheetName).cell(`${columnName}${rowName}`).value(value !== null ? value : '');
    })

    return workBook.outputAsync();
  },
  async _generateForm(data, reportId) {
    const {form, createdBy, createdAt} = data
    let score = 0
    let questionCount = 0
    const promises = []
    Object.entries(form).map(([key, value]) => {
      value.forEach(element => {
        const form = {
          formType: key,
          reportId,
          questionId: element.id,
          isCheck: element.isChecked,
          isActive: true,
          createdDate: createdAt,
          createdBy: createdBy.id
        }
        promises.push(
          Form.create(form)
        )
        if(element.isChecked) {
          score++
        }
        questionCount++
      });
    })
    await Promise.all(promises);
    return parseFloat(score)/questionCount*100;
  }
}