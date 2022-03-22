const { NFTStorage } = require("nft.storage");

// Upload via nft.storage clinet

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_DOT_STORAGE_API_KEY;

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
const nftDotStorage = async (img) => {
    console.log("CALLED  NFT DOT STORAGE");
    try {
        const metadata = await client.store({
            description: "web2 vs Web3 versions of me",
            name: "Web2VSWeb3",
            image: img,
        });
        return metadata;

    } catch (error) {
        console.log("NFT.PORT UPLOAD ERROR", error);
        return "ERROR_NFT_DOT_STORAGE";
    }
};


const ipfsMetadataUrlToHttpUrl = (ipfsUrl) => {
    const url = ipfsUrl.replace('ipfs://', 'https://');
    const metadataURL = url.replace('/metadata.json', '.ipfs.dweb.link/metadata.json');
    return metadataURL;
}

const ipfsImageUrlToHttpUrl = (imageUrl) => {
    var urlArray = imageUrl.split("/");
    urlArray[urlArray.length - 1] = ".ipfs.dweb.link/" + urlArray[urlArray.length - 1];
    var finalUrl = "https:" + "//" + urlArray[2] + urlArray[3];
    return finalUrl;
}

const fetchDataFromIPFS = async (_metadataURL) => {
    console.log("URL:::::",_metadataURL)
    try {
        const metadataURL = ipfsMetadataUrlToHttpUrl(_metadataURL);
        const response = await fetch(metadataURL);
        const data = await response.json();
        console.log("DATA IN JSON",data);
        const imageURl = ipfsImageUrlToHttpUrl(data.image);
        return imageURl;
    } catch (error) {
        console.log("ERROR", error);
    }
};


module.exports = { nftDotStorage, fetchDataFromIPFS }