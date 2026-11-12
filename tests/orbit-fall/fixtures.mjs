// Only for compatibility, challenge unlock and cost tests. Never used by campaign().
export async function unlockFixture(page,{campaignVersion=2,seed=123,room='room-d1-safe',records={}}={}){
 await page.evaluate(async({campaignVersion,seed,room,records})=>{
  const rules=await import('./rules.js'),campaign=(await import('./content.js')).getCampaign(campaignVersion),story=rules.createRun('story',{campaignVersion,seed});
  story.tools=['thruster','boots','tether'];story.solvedPuzzles=[...campaign.requiredPuzzleIds];rules.refreshUnlocks(story);story.endings=['beacon'];story.roomId=room;story.challengeRecords=records;
  for(const suffix of ['',':pending',':backup'])localStorage.removeItem('stteak:orbit-fall:story'+suffix);
  localStorage.removeItem('stteak:orbit-fall:challenge');localStorage.setItem('stteak:orbit-fall:story',JSON.stringify(story));
 },{campaignVersion,seed,room,records});await page.reload();await page.locator('#continue').waitFor({timeout:60000});
}
