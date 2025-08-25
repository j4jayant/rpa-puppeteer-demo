//import { type Response } from 'express'
import puppeteer, { Browser, Page } from 'puppeteer';
import { type Response } from 'express'

const url = 'https://ccrisktool.cancer.gov/calculator.html';

// calculateRisk function
export const calculateRisk = async (params: any, res: Response) => {
    // Create a new puppeteer browser
    const browser = await puppeteer.launch({
        // Change to `false` if you want to open the window
        headless: false,
    });

    // Create a new browser page
    const page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768});
    // Go to the URL
    await page.goto(url);

    console.log(params);

    await page.evaluate((params: any) => {
        
        if(params.hispanic) {
            let hispanicYes = document.querySelector<HTMLElement>('#hispanicYes');
            if(hispanicYes)
                hispanicYes.click();

        } else {
            let hispanicNo = document.querySelector<HTMLElement>('#hispanicNo');
            if(hispanicNo)
                hispanicNo.click();
        }
        
    }, params);

    if(params.hispanic) {
        await page.waitForSelector('#raceModalParagraph1', { visible: true });
        await page.evaluate(() => {
            let raceOKButton = document.querySelector<HTMLElement>("#raceOkButton");
            if(raceOKButton)
                raceOKButton.click();
        })
    }

    await page.evaluate((params: any) => {

        if(params.race === "White") {
            let raceWhite = document.querySelector<HTMLElement>("#WhiteRace");
            if(raceWhite)
                raceWhite.click();
        } else if(params.race === "Black") {
            let blackRace = document.querySelector<HTMLElement>('#BlackRace');
            if(blackRace)
                blackRace.click();
        } else if(params.race === "Asian") {
            let asianRace = document.querySelector<HTMLElement>('#AsianRace');
            if(asianRace)
                asianRace.click();
        }
    }, params);

    if(params.race === "Black" || params.race === "Asian") {
        await page.waitForSelector('#raceModalParagraph1', { visible: true });
        await page.evaluate(() => {
            let raceOKButton = document.querySelector<HTMLElement>("#raceOkButton");
            if(raceOKButton)
                raceOKButton.click();
        })
    }
    
    await page.select('select[id="age"]', params.age.toString());

    await page.evaluate((params: any) => {
        if(params.gender === "M" || params.gender === "Male") {
            let genderMale = document.querySelector<HTMLElement>("#maleGender");
            if(genderMale)
                genderMale.click();
        } else {
            let genderFemale = document.querySelector<HTMLElement>("#femaleGender");
            if(genderFemale)
                genderFemale.click();
        }
    }, params);
    
    await page.type('input[id=height_ft]', params.height.feet.toString());
    await page.type('input[id=height_in]', params.height.inch.toString());
    await page.type('input[id=weight]', params.weight_lbs.toString());
    
    await page.select('select[id="veg_servings"]', params.vegIntake.servingsPerWeek.toString());

    await page.select('select[id="veg_amount"]', params.vegIntake.amountPerServing.toString());

    await page.select('select[id="moderate_months"]', params.physicalActivity.moderate.numberOfMonths.toString());

    await page.select('select[id="moderate_hours"]', params.physicalActivity.moderate.hoursPerWeek.toString());

    await page.select('select[id="vigorous_months"]', params.physicalActivity.vigorous.numberOfMonths.toString());

    page.select('select[id="vigorous_hours"]', params.physicalActivity.vigorous.hoursPerWeek.toString());

    await page.evaluate((params: any) => {

        if(params.colonSigmoidoscopy === "Yes") {
            let colonSigmoidoscopyYes = document.querySelector<HTMLElement>("#colonSigmoidoscopyYes");
            if(colonSigmoidoscopyYes)
                colonSigmoidoscopyYes.click();

            if(params.colonOrRectalPolyp === "Yes") {
                let polypYes = document.querySelector<HTMLElement>("#polypYes");
                if(polypYes)
                    polypYes.click();
            } else if(params.colonOrRectalPolyp === "No") {
                let polypNo = document.querySelector<HTMLElement>("#polypNo");
                if(polypNo)
                    polypNo.click();
            } else {
                let polypUnknown = document.querySelector<HTMLElement>("#polypUnknown");
                if(polypUnknown)
                    polypUnknown.click();
            }
        } else if(params.colonSigmoidoscopy === "No") {
            let colonSigmoidoscopyNo = document.querySelector<HTMLElement>("#colonSigmoidoscopyNo");
            if(colonSigmoidoscopyNo)
                colonSigmoidoscopyNo.click();
        } else if(params.colonSigmoidoscopy === "Unknown") {
            let colonSigmoidoscopyNo = document.querySelector<HTMLElement>("#colonSigmoidoscopyUnknown");
            if(colonSigmoidoscopyNo)
                colonSigmoidoscopyNo.click();
        }
    
        if(params.aspirinMeds === "Yes") {
            let aspirinYes = document.querySelector<HTMLElement>("#aspirinYes");
            if(aspirinYes)
                aspirinYes.click();
        } else if(params.aspirinMeds === "No") {
            let aspirinNo = document.querySelector<HTMLElement>("#aspirinNo");
            if(aspirinNo)
                aspirinNo.click();
        } else if(params.aspirinMeds === "Unkown") {
            let aspirinUnknown = document.querySelector<HTMLElement>("#aspirinUnknown");
            if(aspirinUnknown)
                aspirinUnknown.click();
        }

        if(params.nonAspirinTypeMeds === "Yes") {
            let nonAspirinTypeYes = document.querySelector<HTMLElement>("#nonAspirinTypeYes");
            if(nonAspirinTypeYes)
                nonAspirinTypeYes.click();
        } else if(params.nonAspirinTypeMeds === "No") {
            let nonAspirinTypeNo = document.querySelector<HTMLElement>("#nonAspirinTypeNo");
            if(nonAspirinTypeNo)
                nonAspirinTypeNo.click();
        } else if(params.nonAspirinTypeMeds === "Unkown") {
            let nonAspirinTypeUnknown = document.querySelector<HTMLElement>("#nonAspirinTypeUnknown");
            if(nonAspirinTypeUnknown)
                nonAspirinTypeUnknown.click();
        }

        if(params.familyCancer === "Yes") {
            let familyCancerYes = document.querySelector<HTMLElement>("#familyCancerYes");
            if(familyCancerYes)
                familyCancerYes.click();

            if(params.familyCount === 1) {
                let familyCountYes = document.querySelector<HTMLElement>("#familyCountYes");
                if(familyCountYes)
                    familyCountYes.click();
            } else if(params.familyCount >= 2) {
                let familyCountNo = document.querySelector<HTMLElement>("#familyCountNo");
                if(familyCountNo)
                    familyCountNo.click();
            } else {
                let familyCountUnknown = document.querySelector<HTMLElement>("#familyCountUnknown");
                if(familyCountUnknown)
                    familyCountUnknown.click();
            }
        } else if(params.familyCancer === "No") {
            let familyCancerNo = document.querySelector<HTMLElement>("#familyCancerNo");
            if(familyCancerNo)
                familyCancerNo.click();
        }  else if(params.familyCancer === "Unknown") {
            let familyCancerUnknown = document.querySelector<HTMLElement>("#familyCancerUnknown");
            if(familyCancerUnknown)
                familyCancerUnknown.click();
        } 
        
    }, params);

    await page.evaluate((params: any) => {
        if(params.sigrateSmoked === "Yes") {
            let smokeYes = document.querySelector<HTMLElement>("#smokeYes");
            if(smokeYes)
                smokeYes.click();
        } else if(params.sigrateSmoked === "No") {
            let smokeNo = document.querySelector<HTMLElement>("#smokeNo");
            if(smokeNo)
                smokeNo.click();
        } else {
            let smokeUnknown = document.querySelector<HTMLElement>("#smokeUnknown");
            if(smokeUnknown)
                smokeUnknown.click();
        }
        
    }, params);

    if(params.ageSmokeStarted > 0) {
        await page.select('select[id="firstYearSmoke"]', params.ageSmokeStarted.toString());
        
        await page.evaluate((params: any) => {
            if(params.currentlySmoke) {
                let currentlySmokeYes = document.querySelector<HTMLElement>("#currentlySmokeYes");
                if(currentlySmokeYes)
                    currentlySmokeYes.click();
            } else {
                let currentlySmokeNo = document.querySelector<HTMLElement>("#currentlySmokeNo");
                if(currentlySmokeNo)
                    currentlySmokeNo.click();
            }
        }, params); 

        await page.select('select[id="cigarettes_num"]', params.numberOfCigarettesPerDay.toString());
    }

    await page.click('input[type=submit]');

    let resp: Promise<any>;

    // Wait for a selector to be loaded on the page 
    await page
        .waitForSelector('#results_home', { visible: true })
        .then(async() => {
            resp = await populateOutput(page)
        })
        .then (async () => {
            await takeOutputScreenshot(page)
        })
        .then(async () => {
            await closeBrowser(browser);
        })
        .catch(error => {
			return "error: " + error
		})
        .finally(() => {
            if(resp) {
                res.status(200).json({
                    success: true,
                    data: resp
                })
            } else {
                res.status(500).json({
                    success: false,
                    "error": "error calculating risk1"
                })
            } 
        })
    
};

const closeBrowser = async (browser:Browser) => {
   await browser.close();
}

const populateOutput = async (page:Page): Promise<any> => {

    const name = await page.$$("p.results_header");

    if(!name || name.length < 2) {
        console.error("unexpected output received")
        return null
    }

    const header5Year = await name[0].evaluate(name1 => name1.innerText, name);

    const patRisk1 = await page.$eval('#Risk1', el => el.textContent); 

    const avgRisk1 = await page.$eval('#Risk2', el => el.textContent); 
    
    const resultText5Year = await page.$eval('#results_text_5_years', el => el.textContent); 
    
    const next5YearRisk: any = {
        header: header5Year,
        patientRisk: patRisk1,
        averageRisk: avgRisk1,
        comments: resultText5Year
    };

    const headerLifetime = await name[1].evaluate(name1 => name1.innerText, name);
    
    const patRisk5 = await page.$eval('#Risk5', el => el.textContent); 
    
    const avgRisk6 = await page.$eval('#Risk6', el => el.textContent); 
    
    const resultTextLifetime = await page.$eval('#results_text_lifetime', el => el.textContent); 
    
    const lifeTimeRisk: any = {
        header: headerLifetime,
        patientRisk: patRisk5,
        averageRisk: avgRisk6,
        comments: resultTextLifetime
    };

    const resp: any = {
        next5YearRisk: next5YearRisk,
        lifeTimeRisk: lifeTimeRisk
    }

    return resp;
}

const takeOutputScreenshot = async (page:Page) => {

    await page.screenshot({
        path: 'cancerRiskOutput.png',
        fullPage: true,
    });
}
