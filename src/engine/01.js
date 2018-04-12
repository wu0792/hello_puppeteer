(async () => {
    const readFilePromise = require('fs-readfile-promise'),
        path = require('path'),
        fs = require('fs'),
        basePath = process.cwd(),
        groupMap = require('./groupMap'),
        configText = await readFilePromise(path.join(process.cwd(), './src/data/01.json'), { encoding: 'utf8' }),
        configJson = JSON.parse(configText),
        { steps, template } = configJson;

    let output = []
    steps.forEach((step, index) => {
        const { title, group, subGroup, ctorParams, execParams, returnAs } = step,
            flatCtorParams = ctorParams.join(', '),
            flatExecParams = execParams.join(', '),
            theGroup = groupMap[group],
            theSubGroup = theGroup[subGroup],
            theReturn = returnAs ? `const ${returnAs} = ` : '',
            theStepCtorCode = `const step${index} = new ${theSubGroup}(${flatCtorParams})`,
            theStepExecCode = `${theReturn}await step${index}.doExecute([${flatExecParams}])`

        output.push(theStepCtorCode)
        output.push(theStepExecCode + '\n')
    });

    const templateContent = await readFilePromise(path.join(process.cwd(), template), { encoding: 'utf8' }),
        result = templateContent.replace('[CONTENT]', output.join('\n'))

    fs.writeFile(path.join(process.cwd(), './src/exec/01.js'), result, (err) => {
        if (err) throw err
        console.log('file 01 is generated.')
    })
})()