
require('notice');

require('base/team');

var startColor = Color.valueOf("00FFE1FF"); 

var shiftValue = 20; 
var mod = Vars.mods.locateMod("planwar");

var st = mod.meta.displayName;

var fin = new java.lang.StringBuilder();



for (var i = 0; i < st.length; i++) {

   var s = java.lang.String.valueOf(st.charAt(i));

   var c = startColor.shiftHue(i * (shiftValue / st.length));

   var ci = c.rgb888();

   var ct = java.lang.Integer.toHexString(ci);

   var fct = "[" + "#" + ct + "]";

   fin.append(fct)
      .append(s);

}


mod.meta.displayName = fin.toString();
Events.on(EventType.ClientLoadEvent, () => {
   if (Vars.mods.getMod("\u65E0\u9650\u5B87\u5B99") != null) Vars.mods.removeMod(Vars.mods.getMod("\u65E0\u9650\u5B87\u5B99"));
})/*
mod.meta.displayName = fin.toString();
Events.on(EventType.ClientLoadEvent, () => {
   if (Vars.mods.getMod("Fire") != null) Vars.mods.removeMod(Vars.mods.getMod("Fire"));
})
mod.meta.displayName = fin.toString();
Events.on(EventType.ClientLoadEvent, () => {
   if (Vars.mods.getMod("fire") != null) Vars.mods.removeMod(Vars.mods.getMod("fire"));
})*/
//

print("Welcome to PlanWar！");
//require(





