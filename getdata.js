const axios = require('axios');
const TurndownService = require('turndown');
const turndownService = new TurndownService();
module.exports = {

    getQuestion: async function (requestedurl, rand) {

            var formattedurl = requestedurl.replace(/ /g, '-').toLowerCase();
        const Url = 'https://leetcode.com/graphql';
        const  Data = 
            {
            operationName: 'questionData',
                variables: {
                titleSlug: formattedurl
            },
            query: 'query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    boundTopicId\n    title\n    titleSlug\n    content\n    translatedTitle\n    translatedContent\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n    contributors {\n      username\n      profileUrl\n      avatarUrl\n      __typename\n    }\n    topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    companyTagStats\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    stats\n    hints\n    solution {\n      id\n      canSeeDetail\n      paidOnly\n      hasVideoSolution\n      __typename\n    }\n    status\n    sampleTestCase\n    metaData\n    judgerAvailable\n    judgeType\n    mysqlSchemas\n    enableRunCode\n    enableTestMode\n    enableDebugger\n    envInfo\n    libraryUrl\n    adminUrl\n    __typename\n  }\n}\n'
        };
        var title;
        var content;
        var difficulty;
        var likes;
        var dislikes;
        var accepted;
        var submissions;
        var rate;
        var link;
       await axios({
            method: 'post',
            url: Url,
            data: Data
            
        })
           .then(data => {
               title = data.data.data.question.title;
               content = turndownService.turndown(data.data.data.question.content);
               likes = data.data.data.question.likes;
               dislikes = data.data.data.question.dislikes;
               accepted = JSON.parse(data.data.data.question.stats).totalAccepted;
               submissions = JSON.parse(data.data.data.question.stats).totalSubmission;
               rate = JSON.parse(data.data.data.question.stats).acRate;
               link = "https://leetcode.com/problems/" + data.data.data.question.titleSlug;
               difficulty = data.data.data.question.difficulty;
           })
            .catch(error => console.log(error + "Error that was"))
        if (title == undefined || content == undefined || title == null || content==null) {
            if (rand) {
                this.getRandom();
           }
            title = "Invalid Question";
            content = "Sorry, I couldn't find the question you wanted :*(. \nMaybe try a random question? You can request one by typing: \n `!leet-rand`";
            likes= dislikes= accepted= submissions= rate= link = difficulty = "";
        }
        return  title + "|" + content + "|" + likes+ "|" + dislikes+ "|" + accepted+ "|" + submissions+ "|" + rate+ "|" + link + "|" + difficulty;
    },
    answerQuestion: async function (requestedurl, answer, lang) {
        // var response = "";

        // try {
        //     const browser = await puppeteer.launch({
        //         defaultViewport: null,
        //         headless: true,
        //         args: ['--start-maximized']

        //     });
           
        //     const page = await browser.newPage();

        //     await page.goto('https://leetcode.com/accounts/login/');
        //     await page.waitFor('#signin_btn');
        //     await page.focus('#id_login');

        //     await page.keyboard.type('ephremadugna1219@gmail.com');
        //     await page.focus('#id_password');
        //     await page.keyboard.type('EphremA111');
        //     await setTimeout(() => {
        //         page.click('#signin_btn');

        //     }, 1000);
        //     var formattedurl = requestedurl.replace(/ /g, '-').toLowerCase();
        //     let t1 = await page.evaluate(async () => {
        //         let data = {};
        //         await document.querySelectorAll('.nav-item__5BvG')[2].click();

        //     });
        //     await page.waitFor('.form-control');
        //     await page.click('.form-control');

        //     await page.keyboard.type(formattedurl);
        //     await page.waitFor('.reactable-data');
        //     await setTimeout(async () => {
        //         let n1 = await page.evaluate(async () => {
        //             let data = {};
        //             await document.getElementsByTagName('a')[27].click();

        //         });
        //     }, 1000);
       
        //     await page.waitFor('.CodeMirror-code');
     
        //     await page.click('.CodeMirror-code');
        //     await page.keyboard.down('Control');
        //     await page.keyboard.type('A');

        //     await page.keyboard.up('Control');

        //     await page.keyboard.type(answer);
        //     await page.click('.submit__2ISl');
        //     await page.waitFor('#signin_btn');
        //     await page.focus('#id_login');

        //     await page.keyboard.type('ephremadugna1219@gmail.com');
        //     await page.focus('#id_password');
        //     await page.keyboard.type('EphremA111');
        //     await page.keyboard.down('Enter');
        //     await page.keyboard.up('Enter');
        //     await page.waitFor(5000);
        //     await page.waitFor('.ant-select-selection__rendered');
        //     await page.click('.ant-select-selection__rendered');
        //     let n4 = await page.evaluate(async (lang) => {
        //         let data = {};
        //         for (var elem of document.querySelector('.ant-select-dropdown-menu').getElementsByTagName('li')) {
        //             if (elem.textContent.toLowerCase() === lang.replace(' ', '').toLowerCase()) {
        //                 elem.click();
        //             }
        //         }

        //     }, lang);
        //     await page.click('#app > div > div.main__2_tD > div.content__3fR6 > div > div.editor-wrapper__1ru6 > div > div.container__2WTi > div.action__38Xc > button.submit__2ISl.css-gahzfj-sm > span');
       
        //     await page.waitFor("#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-9z7f7i-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-xailxq-TabContent.e5i1odf5 > div > div");
        //     let n1 = await page.evaluate(async () => {
        //         let data = {};
        //         return document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-9z7f7i-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-xailxq-TabContent.e5i1odf5 > div > div").innerHTML;

        //     });
        //     const element = await page.$('#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-9z7f7i-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-xailxq-TabContent.e5i1odf5 > div > div');
        //     await setTimeout(async () => {

        //         await element.screenshot({ path: 'resp.png' })
        //     }, 10000);

        //     response = "Response:";
        //     browser.close();
        // }
        // catch {
        //     response = "There was an error getting your question";
        // }
        return "Sorry, this command is still under development";
        // return response;
    },
    getRandom: async function () {
        const Url = 'https://leetcode.com/api/problems/all/';
       var randomItems;
       await axios.get(Url)
            .then(data => randomItems = data.data.stat_status_pairs)
            .catch(err => console.log(err))
        var question = await randomItems[Math.floor(Math.random() * randomItems.length)].stat.question__title_slug;
        return this.getQuestion(question, true);
    }
}