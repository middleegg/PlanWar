// The following comment is for VSHES Lizhi to independently complete the update of the splash screen display window plugin, so that other developers can also update it. // Waiting for changes, the comment remains unchanged
const lib = require("base/coflib");
Events.on(EventType.ClientLoadEvent, cons(e => {
    var dialog = new BaseDialog(lib.bundle("dialog.main.title"));

    dialog.buttons.button("@close", run(() => {
        dialog.hide()
    })).size(128, 64);
    dialog.cont.button(lib.bundle("button.qq1"), run(() => {
        Core.app.openURI("https://qun.qq.com/universal-share/share?ac=1&authKey=RrlM1yp0QFPyHiqT1q8B38%2FctcOzjuROLhfCWyNgiOX5TzEJXEvH7kcNPlZqwQVI&busi_data=eyJncm91cENvZGUiOiIyOTQ4MzU0OTgiLCJ0b2tlbiI6ImFwbHJiQzQranZvSFRraWlramRlZjF6dWRGVUkzdE8yaC9tcjBpSGtvL1BkdFRjYXVtZUlDbmZNNEhiZ3FOVlAiLCJ1aW4iOiIzMDY3NDg0MzYyIn0%3D&data=eCAiYLDPJ9bGKXfiGhb4Gd2_lQIjkzMx9tlPiTYTsxV19t-FeoDFSA9HTFp6EQseSEGYoU6ojAKZfmZDOd_-Pg&svctype=4&tempid=h5_group_info");
    })).size(130, 70).pad(3).row;
    dialog.cont.button(lib.bundle("button.qq2"), run(() => {
        Core.app.openURI("https://qun.qq.com/universal-share/share?ac=1&authKey=eaoczxkKWnlqh9wBnYHbJkHbNLzGvGRCHtPvny4ErCAaHr4jRPh6jj%2FI4uCGCM6L&busi_data=eyJncm91cENvZGUiOiI2MzI1NDc5MzkiLCJ0b2tlbiI6Im1QdXMrbHRTdmJRTE5wL0xWN1FHNXNBdVZoNkwzOTBDMkY5bEo2OFQwMklRY3UvMUhZTlErSEcwb2M1aFFBdkoiLCJ1aW4iOiIzMDY3NDg0MzYyIn0%3D&data=5mw07InbtR2ofXNKtK1rOgcXjc6BpSCtuiWYT7AokX7bly6cMOjI9hV-W7leYthyaDhIXusxvK9SGDVT-Pd1_Q&svctype=4&tempid=h5_group_info");
    })).size(130, 70).pad(3);
    dialog.cont.pane((() => {
        var table = new Table();
        table.image(Core.atlas.find("planwar-logo1")).left().size(600, 200).pad(3).row();
        table.add(lib.bundle("table.welcome")).left().growX().wrap().width(600).maxWidth(600).pad(6).labelAlign(Align.left);
        table.row();
        return table;
    })()).grow().center().maxWidth(700);
    dialog.cont.button(lib.bundle("button.author"), run(() => {
        Core.app.openURI("https://b23.tv/ZqGOrhl");
    })).size(110, 70).pad(9);

    dialog.buttons.button(lib.bundle("button.misc"), run(() => {
        var dialog2 = new BaseDialog(lib.bundle("misc.dialog.title"));
        dialog2.cont.button(lib.bundle("misc.button.discord"), run(() => {
            Core.app.openURI("https://discord.gg/s3yUP2PKTK");
        })).size(110, 80).pad(9);
        dialog2.cont.button(lib.bundle("misc.button.worldview"), run(() => {
            Core.app.openURI("https://teyan.xyz/w/150840");
        })).size(110, 80).pad(9);

        dialog2.cont.pane((() => {
            var table = new Table();
            table.add(lib.bundle("misc.pane.text")).left().growX().wrap().width(300).maxWidth(300).pad(4).labelAlign(Align.left);
            table.row();
            return table;
        })()).grow().center().maxWidth(340);
        dialog2.buttons.defaults().size(200, 200);
        dialog2.cont.image(Core.atlas.find("planwar-Integrate")).left().size(500, 500).pad(5).row();
        dialog2.addCloseButton();
        dialog2.show();
        dialog2.buttons.button(lib.bundle("misc.button.allitems"), run(() => {
            var dialog2 = new BaseDialog(lib.bundle("misc.allitems.dialog.title"));
            dialog2.cont.pane((() => {
                var table = new Table();
                table.image(Core.atlas.find("planwar-allitems")).left().size(600, 600).pad(3).row();
                table.row();
                return table;
            })()).grow().center().maxWidth(1000);
            dialog2.buttons.defaults().size(210, 64);
            dialog2.addCloseButton();
            dialog2.show();
        })).size(210, 64);
        dialog.show();

        dialog2.buttons.button(lib.bundle("misc.button.knowledge"), run(() => {
            var dialog2 = new BaseDialog(lib.bundle("knowledge.dialog.title"));
            var messages = [
                lib.bundle("knowledge.msg1"),
                lib.bundle("knowledge.msg2"),
                lib.bundle("knowledge.msg3"),
                lib.bundle("knowledge.msg4"),
                lib.bundle("knowledge.msg5"),
                lib.bundle("knowledge.msg6"),
                lib.bundle("knowledge.msg7"),
                lib.bundle("knowledge.msg8"),
                lib.bundle("knowledge.msg9")
            ];

            var n = 3;
            var selectedIndices = [];
            while (selectedIndices.length < n) {
                var randomIndex = Math.floor(Math.random() * messages.length);
                if (selectedIndices.indexOf(randomIndex) === -1) {
                    selectedIndices.push(randomIndex);
                }
            }

            dialog2.cont.pane((() => {
                var table = new Table();
                for (var i = 0; i < selectedIndices.length; i++) {
                    table.add("[gold]" + messages[selectedIndices[i]]).left().growX().wrap().width(390).maxWidth(390).pad(4).labelAlign(Align.left);
                    table.row();
                }
                return table;
            })()).grow().center().maxWidth(1000);
            dialog2.buttons.defaults().size(210, 64);
            dialog2.addCloseButton();
            dialog2.show();
        })).size(210, 64);
        dialog.show();

    })).size(210, 64);

    dialog.buttons.button(lib.bundle("button.advice"), run(() => {
        var dialog3 = new BaseDialog(lib.bundle("advice.dialog.title"));
        dialog3.cont.pane((() => {
            var table = new Table();
            table.image(Core.atlas.find("planwar-logo3")).left().size(800, 400).pad(4).row();
            table.add(lib.bundle("advice.pane.text")).left().growX().wrap().width(390).maxWidth(390).pad(4).labelAlign(Align.left);
            table.row();
            table.image(Core.atlas.find("planwar-plan-war")).left().size(280, 280).pad(3);
            table.row();
            table.image(Core.atlas.find("planwar-icon2")).left().size(280, 280).pad(4);
            table.row();
            return table;
        })()).grow().center().maxWidth(1000);
        dialog3.buttons.defaults().size(210, 64);
        dialog3.addCloseButton();
        dialog3.show();
    })).size(210, 64);
    dialog.show();

    dialog.buttons.button(lib.bundle("button.changelog"), run(() => {
        var dialog4 = new BaseDialog(lib.bundle("changelog.dialog.title"));
        dialog4.cont.pane((() => {
            var table = new Table();
            table.image(Core.atlas.find("planwar-planwarbe")).left().size(280, 280).pad(3).row();
            let fl = new FLabel("{shake}" + lib.bundle("text-welcome")),
                fl2 = new FLabel("{fade}" + lib.bundle("text-version", lib.mod.meta.version));
            table.add(fl).center().width(600).maxWidth(600).padLeft(-440).labelAlign(Align.center).row();
            table.add(fl2).center().width(600).maxWidth(600).padLeft(-315).labelAlign(Align.center).row();
            table.add(lib.bundle("changelog.pane.text")).left().growX().wrap().width(500).maxWidth(500).pad(4).labelAlign(Align.left);
            table.image(Core.atlas.find("planwar-update_0")).left().size(280, 280).pad(4).row();
            table.image(Core.atlas.find("planwar-icon5")).left().size(280, 280).pad(4);
            table.image(Core.atlas.find("planwar-icon3")).left().size(280, 280).pad(4).row();
            dialog.show();
            table.row();
            return table;
        })()).grow().center().maxWidth(1000);
        dialog4.buttons.defaults().size(210, 64);
        dialog4.addCloseButton();
        dialog4.show();
    })).size(210, 64);
    dialog.show();

    dialog.buttons.button(lib.bundle("button.credits"), run(() => {
        var dialog5 = new BaseDialog(lib.bundle("credits.dialog.title"));
        dialog5.cont.pane((() => {
            var table = new Table();
            table.image(Core.atlas.find("planwar-logo4")).left().size(900, 150).pad(3).row();
            table.add(lib.bundle("credits.pane.text")).left().growX().wrap().width(300).maxWidth(300).pad(4).labelAlign(Align.left);
            table.row();
            table.image(Core.atlas.find("planwar-logoqq")).left().size(776, 280).pad(4).row();
            table.row();
            return table;
        })()).grow().center().maxWidth(1000);
        dialog5.buttons.defaults().size(210, 64);
        dialog5.addCloseButton();
        dialog5.show();
    })).size(210, 64);
    dialog.show();

    dialog.buttons.button(lib.bundle("button.oldchangelog"), run(() => {
        var dialog5 = new BaseDialog(lib.bundle("oldchangelog.dialog.title"));
        dialog5.cont.pane((() => {
            var table = new Table();
            table.image(Core.atlas.find("planwar-logo4")).left().size(900, 150).pad(3).row();
            table.add(lib.bundle("oldchangelog.pane.text")).left().growX().wrap().width(300).maxWidth(300).pad(4).labelAlign(Align.left);
            table.row();
            table.image(Core.atlas.find("planwar-b1")).left().size(200, 200).pad(4).row();
            table.row();
            return table;
        })()).grow().center().maxWidth(1000);
        dialog5.buttons.defaults().size(210, 64);
        dialog5.addCloseButton();
        dialog5.show();
    })).size(210, 64);
    dialog.show();
}))
