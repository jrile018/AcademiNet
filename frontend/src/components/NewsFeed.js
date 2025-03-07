// src/components/NewsFeed.js
import React from 'react';

function NewsFeed() {
  // Sample fake research update news items
  const newsItems = [
    {
      id: 1,
      title: "Breakthrough in Quantum Computing",
      content: "Researchers at AcademiNet have developed a new algorithm that dramatically speeds up quantum computations."
    },
    {
      id: 2,
      title: "New AI Model Revolutionizes Data Analysis",
      content: "A state-of-the-art AI model is now helping scientists analyze large datasets more efficiently than ever before."
    },
    {
      id: 3,
      title: "Genome Sequencing Achieves Record Accuracy",
      content: "Innovative techniques in genome sequencing have set a new standard for precision in genetic research."
    },
  ];

  return (
    <div className="news-feed">
      <h2>Research Updates</h2>
      {newsItems.map((item) => (
        <div key={item.id} className="news-item">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default NewsFeed;
