exports.modName = "planwar"
exports.mod = Vars.mods.locateMod(exports.modName);

exports.addToResearch = (content, research) => {
	if (!content) {
		throw new Error('content is null!');
	}
	if (!research.parent) {
		throw new Error('research.parent is empty!');
	}
	let researchName = research.parent;
	let customRequirements = research.requirements;
	let objectives = research.objectives;
	let lastNode = TechTree.all.find(boolf(t => t.content == content));
	if (lastNode != null) {
		lastNode.remove();
	}
	let node = new TechTree.TechNode(null, content, customRequirements !== undefined ? customRequirements : content.researchRequirements());
	if (objectives) {
		node.objectives.addAll(objectives);
	}
	if (node.parent != null) {
		node.parent.children.remove(node);
	}
	let parent = TechTree.all.find(boolf(t => t.content.name.equals(researchName) || t.content.name.equals(exports.modName + "-" + researchName)));
	if (parent == null) {
		throw new Error("Content '" + researchName + "' It is empty in the technology tree, but '" + content.name + "This thing still requires it as a prerequisite.");
	}
	if (!parent.children.contains(node)) {
		parent.children.add(node);
	}
	node.parent = parent;
}

exports.AngleTrns = (ang, rad, rad2) => {
	if (rad2) {
		return {
			x: Angles.trnsx(ang, rad, rad2),
			y: Angles.trnsy(ang, rad, rad2)
		}
	} else {
		return {
			x: Angles.trnsx(ang, rad),
			y: Angles.trnsy(ang, rad)
		}
	}
}