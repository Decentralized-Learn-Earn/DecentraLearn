

contract Decentralearn {

mapping (address => token_address => uint) claims;

function Quest(string[] questions,
               string[] answers,
               uint _rightAnswer[],
               address _token_address,
               uint claim_per_question
               address _user
               ) external {
  uint claim = 0;
  // _rightAnswer shoul be encrypted
  for (uint i = 0; i++; i< questions.length()) {
    if (_answers[i] == _rightAnswer[i]) {
      claim += claim_per_question;
    }
  }
  claims[_user][token_address] += claim;
}

function Claim(address _user; address _tokenAddress) external {
  //require user is human;
  require (claims[_user][_tokenAddress] > 0);
  // pay token to user
  claims[_user][_tokenAddress] = 0;
}

//The private version would be called  from Quest  and would only allow claim
//at the moment, would not be persistent.
}
