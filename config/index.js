const artifactDetails = require("../ArtifactDetails.json");

module.exports = {
  web: {
    artifact: artifactDetails,
    name: artifactDetails.name,
    version: artifactDetails.version,
    port: process.env.SERVER_PORT || 3000
  },
  db: {
    url: process.env.MONGODB_URL || "mongodb://mongodb"
  },
  search: {
    pageOptions: {
      limit: 6,
      page: 1,
      sort: { createdAt: -1 }
    }
  }
};
