export const getVideos = async () => {
  const query = `{
    transactions(
      tags: [
        { name: "app-name", values: ["my-youtube-app"] },
        { name: "Content-Type", values: ["video/mp4"] }
      ],
      sort: HEIGHT_DESC
    ) {
      edges {
        node {
          id
          tags {
            name
            value
          }
        }
      }
    }
  }`;

  const response = await fetch('https://arweave.net/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  const { data } = await response.json();
  return data?.transactions?.edges?.map(edge => edge.node) || [];
};

export const getVideoMetadata = async (txId) => {
  const query = `{
    transaction(id: "${txId}") {
      tags {
        name
        value
      }
    }
  }`;

  const response = await fetch('https://arweave.net/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  const { data } = await response.json();
  if (!data?.transaction?.tags) return {};
  
  return {
    title: data.transaction.tags.find(t => t.name === 'title')?.value,
    description: data.transaction.tags.find(t => t.name === 'description')?.value,
    thumbnail: data.transaction.tags.find(t => t.name === 'thumbnail-tx')?.value
  };
};

export const getUserVideos = async (address) => {
  console.log("Fetching videos for address:", address);
  
  const query = `{
    transactions(
      owners: ["${address}"],
      tags: [
        { name: "app-name", values: ["my-youtube-app"] },
        { name: "Content-Type", values: ["video/mp4"] }
      ],
      sort: HEIGHT_DESC
    ) {
      edges {
        node {
          id
          tags {
            name
            value
          }
        }
      }
    }
  }`;

  try {
    const response = await fetch('https://arweave.net/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const result = await response.json();
    console.log("GraphQL response:", result);
    
    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return [];
    }

    return result.data?.transactions?.edges?.map(edge => edge.node) || [];
  } catch (error) {
    console.error("Error fetching user videos:", error);
    return [];
  }
};