step one call api and allow user to select country
-------------------------------------------------(done)
GET /api/countries
user will select on the ui country of there choice
add search bar to filter using key words initials
  [
  {
    "country_code": "UG",
    "country_name": "Uganda",
    "currency": "UGX",
    "phone_prefix": "+256",
    "flag_url": "https://flagcdn.com/w40/ug.png"
  },
  {
    "country_code": "GH",
    "country_name": "Ghana",
    "currency": "GHS",
    "phone_prefix": "+233",
    "flag_url": "https://flagcdn.com/w40/gh.png"
  },….]


set two discover payment methods of country choosen on ui
---------------------------------------------------------(done)
GET /api/countries/{UG}/discover WHERE UG is a dynamic country_code
allow user to select payment method user can filter by options   {  all,banks,cards,mobile_money }
if options i.e card is empty then we will not show filter button
similar to countries user can search by name  

{
  "country_code": "UG",
  "options": {
    "cards": [],
    "banks": [
      {
        "code": "",
        "name": "Manual Input",
        "currency": "UGX",
        "ramps": [
          "withdraw"
        ],
        "providers": [
          "yellowcard"
        ],
        "meta": {
          "min_amount": 100,
          "max_amount": 150000000
        }
      }
    ],
    "mobile_money": [
      {
        "code": "Mobile Money",
        "name": "Mobile Money",
        "currency": "UGX",
        "ramps": [
          "deposit",
          "withdraw"
        ],
        "providers": [
          "yellowcard"
        ],
        "meta": {
          "min_amount": 15000,
          "max_amount": 3000000
        }
      }
    ]
  }
}
 


prepare ready data for submittions
-----------------------------()....
we show preview of the data and allow user to submit.
should support banks , mobile money, cards
 expected data 
 {
  "country_code": "UG",
  "currency": "UGX", 
  "payment_method": {
    "category": "mobile_money",
    "code": "Mobile Money",
    "provider": "yellowcard"
  },
  "transaction": {
    "type": "deposit",
    "amount": 15000,
    "remark": "Top up wallet"
  },
  "account": {
    "phone": "+256712345678",
    "account_number": "+256712345678",//THIS WILL  ACT AS ACCOUNT NUMBER FOR BANKS TRANSFER if not we key in the phone number
  }
}
//payment response
{
  "success": true,
  "message": "Payment request accepted",
  "data": {
    "transaction_id": 1,
    "reference": "MPAY-UG-20260228182146-U9JFER",
    "status": "pending"
  }
}