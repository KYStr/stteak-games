// A dense exported garden is ONLY a performance workload, never a gameplay win.
export const fixture=process.env.MOSS_FIXTURE||'/workspace/stteak8/work/moss-and-moon/rounds/r2/qa-stress/fixture.json';
export async function importPerformanceFixture(page,base) {
 await page.goto(base);await page.locator('#new-mode').selectOption('free');await page.locator('#start').click();await page.keyboard.press('Escape');
 await page.locator('[data-open="settings"]').click();await page.locator('#import-file').setInputFiles(fixture);
 await page.waitForFunction(()=>window.mossDiagnostics().day===31);await page.locator('[data-resume]').click();
}
