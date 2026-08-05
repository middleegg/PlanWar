
function getTeamName(id, defaultName) {
    var key = "team." + id + ".name";
    var localized = Core.bundle.get(key);
    if (localized && localized !== key) {
        return localized;
    }
    return defaultName;
}

var teamDefinitions = [
    { id: 20, defaultName: "R-flame",   color: "#D37474FF" },
    { id: 21, defaultName: "Iteration", color: "#FF69B4"   },
    { id: 22, defaultName: "cipher",    color: "#00FFFF"   },
    { id: 23, defaultName: "Anuke",     color: "#6F67E0FF" },
    { id: 24, defaultName: "trace",     color: "#FF00FF"   },
    { id: 25, defaultName: "B-flame",   color: "#2A2C4CFF" },
    { id: 26, defaultName: "hollow",    color: "#808080"   },
    { id: 27, defaultName: "integrate", color: "#B8860B"   },
    { id: 28, defaultName: "ancient",   color: "#000000"   },
    { id: 29, defaultName: "sylvan",    color: "#7CFC00"   },
    { id: 30, defaultName: "mycelium",  color: "#C71585"   },
    { id: 31, defaultName: "portal",    color: "#8A2BE2"   },
    { id: 32, defaultName: "abyss",     color: "#FFFFFF"   },
    { id: 33, defaultName: "primacore", color: "#FFD700"   }
];


var ancyColorMain = Color.valueOf("#f25555");
var ancyColorLight = Color.valueOf("#fc8e6c");
var ancyColorDark = Color.valueOf("#a04553");

var allCustomTeams = [];

function createTeamFromDef(def) {
    var id = def.id;
    var name = getTeamName(id, def.defaultName);
    var colorStr = def.color;
    var isAncy = (id === 51);
    
    var team = Team.get(id);
    team.name = name;
    var mainColor = Color.valueOf(colorStr);
    team.color.set(mainColor);
    
    if (team.palette === null) {
        team.palette = [];
        for (var j = 0; j < 3; j++) team.palette[j] = new Color();
    }
    if (isAncy) {
        team.palette[0].set(ancyColorMain);
        team.palette[1].set(ancyColorLight);
        team.palette[2].set(ancyColorDark);
    } else {
        team.palette[0].set(mainColor).mul(1.2);
        team.palette[1].set(mainColor).mul(0.9);
        team.palette[2].set(mainColor).mul(0.7);
    }
    team.hasPalette = true;
    team.ignoreUnitCap = true;
    return team;
}

// 反射扩展 baseTeams
function extendBaseTeams() {
    var teamClass = Team.all[0].getClass();
    var field = teamClass.getDeclaredField("baseTeams");
    field.setAccessible(true);
    
    var originalCount = Team.baseTeams.length;
    var totalCount = originalCount + allCustomTeams.length;
    var newArr = java.lang.reflect.Array.newInstance(teamClass, totalCount);
    for (var i = 0; i < originalCount; i++) {
        newArr[i] = Team.baseTeams[i];
    }
    for (var i = 0; i < allCustomTeams.length; i++) {
        newArr[originalCount + i] = allCustomTeams[i];
    }
    field.set(null, newArr);
}


function addSettingsToggle() {
    Vars.ui.settings.game.checkPref("Team swich", Core.settings.getBool("Team swich", false));
}


function createTeamPanel() {
    Vars.ui.hudGroup.fill(null, function(outerTable) {
        outerTable.table(Styles.black6, function(inner) {
            inner.add("Current team：").padRight(5);
            var teamLabel = new Label("");
            inner.add(teamLabel).color(Color.white).padRight(10).row();

            inner.table(cons(function(grid) {
                for (var i = 0; i < allCustomTeams.length; i++) {
                    (function(team) {
                        var button = grid.button(team.name, run(function() {
                            Vars.player.team(team);
                            Vars.ui.showInfoFade("Already switched to " + team.name);
                        })).color(team.color).size(100, 40).pad(2);
                       
                        if (team.emoji) {
                            button.get().getCells().first().setLabel(team.emoji + " " + team.name);
                        }
                    })(allCustomTeams[i]);
                    if ((i + 1) % 5 === 0) grid.row();
                }
            })).row();

            inner.button("Switch back to the original team", run(function() {
                Vars.player.team(Team.sharded);
                Vars.ui.showInfoFade("Switched back to the original team");
            })).color(Color.gray).size(200, 40).padTop(5).row();

            inner.update(run(function() {
                var currentTeam = Vars.player.team();
                var displayName = currentTeam.name;
                if (currentTeam.emoji) {
                    displayName = currentTeam.emoji + " " + displayName;
                }
                teamLabel.setText(displayName);
            }));
        }).width(550).pad(10);

        
        var lastX = 0, lastY = 0;
        outerTable.addListener(extend(InputListener, {
            touchDown: function(event, x, y, pointer, button) {
                var v = outerTable.localToParentCoordinates(Tmp.v1.set(x, y));
                lastX = v.x;
                lastY = v.y;
                return true;
            },
            touchDragged: function(event, x, y, pointer) {
                var v = outerTable.localToParentCoordinates(Tmp.v1.set(x, y));
                outerTable.translation.add(v.x - lastX, v.y - lastY);
                lastX = v.x;
                lastY = v.y;
            }
        }));

        outerTable.bottom().right();
        outerTable.visibility = function() {
            return Core.settings.getBool("Team swich");
        };
    });
}

Events.on(ClientLoadEvent, function() {
    
    for (var i = 0; i < teamDefinitions.length; i++) {
        allCustomTeams.push(createTeamFromDef(teamDefinitions[i]));
    }
    extendBaseTeams();
    addSettingsToggle();
    createTeamPanel();
});