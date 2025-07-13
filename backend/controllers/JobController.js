const Job = require('../models/Job');

// getall
exports.getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

// add
exports.addJob = async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
};

// update
exports.updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(job);
};

// delete
exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
