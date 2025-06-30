
 const expressAsyncHandler = require("express-async-handler");
const Rank = require("../Models/rankModel")


// add a rank
const getRank = expressAsyncHandler(async (req, res) => {
 try {
    const topicId = req.params._ptid;

    const ranks = await Rank.find({ projectTopic: topicId })
      .populate('user', 'name')
.populate('project', 'githubLink description')   
   .sort({ position: 1 }); // optional if you want ascending

    const result = ranks.map(rank => ({
      name: rank.user?.name || 'Unknown',
      position: rank.position,
  githubLink: rank.project?.githubLink || 'Not Available',
      description: rank.project?.description || 'No description',
    }));

    res.status(200).json({
      topicId,
      count: result.length,
      ranks: result
    });
  } catch (error) {
    console.error("Error in getRanksByTopic:", error);
    res.status(500).json({ message: "Failed to fetch ranks" });
  }
});

module.exports = getRank