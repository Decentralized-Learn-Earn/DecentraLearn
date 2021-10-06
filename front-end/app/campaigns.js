import "./campaigns.css";

export default function build({ tokenAddress, attributes }) {
  const { tokenAddress, uploader, totalNumOftokens, NumOftokensPerTrng, cid, campaignId, isActive, state } = attributes;
  return `
    <div class="campaign">
      <label> Campaign (#${tokenAddress})</label>
      <div class="info">
        <div class="campaignId">
          <strong>Campaign ID</strong>: ${campaignId}
        </div>
        <div class="isActive">
          <strong>Live</strong>: ${isActive}
        </div>
        <div class="totalNumOftokens">
          <strong>Total Number Of Tokens</strong>: ${totalNumOftokens}
        </div>
        <div class="numOftokensPerTrng">
          <strong>Number Of tokens Per Training</strong>: ${NumOftokensPerTrng}
        </div>
        <div class="uploader">
          <strong>Uploader</strong>: ${uploader}
        </div>        
      </div>
    </div>
  `;
}
