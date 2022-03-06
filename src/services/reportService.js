const { Report, Form, User, Question } = require('../models/dbConfig');
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
          attributes: [['question', 'data']],
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
  async downloadReport(id) {
    let report = await Report.findOne({
      where: {
        id
      },
      attributes: ['formType', 'team', 'leader', 'driller',
        'member1', 'member2', 'note', 'score', 'createdDate'
      ],
      include: [
        {
          model: User,
          attributes: ['fullName']
        },
        {
          model: Form,
          attributes: ['isCheck'],
          include: [{
            model: Question,
            attributes: ['id', 'question'],
          }]
        }
      ]
    })

    const sheetName = 'Sheet1'
    const dataKeyReport = 'report'
    const startIndex = 15

    report = JSON.parse(JSON.stringify(report))

    const workBook = await XlsxPopulate.fromFileAsync(templateReport);

    let columnName
    let rowName
    Object.keys(report).forEach((key) => {
      let value = report[key];
      let defineName = `${dataKeyReport}.${key}`
      if (key === 'user') {
        value = report[key]['fullName'];
        defineName = `${dataKeyReport}.${'fullName'}`
      }
      if (key === 'formType') {
        value = formTypeEnum[value]
      }
      let wBookDefineName = workBook.definedName(defineName)
      if(wBookDefineName && wBookDefineName.columnName() ){
        columnName = wBookDefineName.columnName();
        rowName = wBookDefineName.rowNumber();
        workBook.sheet(sheetName).cell(`${columnName}${rowName}`).value(value !== null ? value : '');
      }
    })

    columnName = ''
    rowName = ''
    report.forms.forEach((row, index) => {
      let rowIndex = parseFloat(startIndex) + parseFloat(index)
      Object.keys(row).forEach((key) => {
        let value = row[key];
        if (key === 'question') {
          const range = workBook.sheet(sheetName).range(`A${rowIndex}:D${rowIndex}`);
          range.value(value.question);
          range.merged(true);
          range.style('wrapText', true);
          range.style('border', true);
        }
        if (key === 'isCheck') {
          const range = workBook.sheet(sheetName).cell(`E${rowIndex}`).value(value !== null ? value === true ? 'Yes' : 'No' : '');
          range.style({horizontalAlignment: "center", verticalAlignment: "center", })
          range.style('border', true);
        }
      })
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