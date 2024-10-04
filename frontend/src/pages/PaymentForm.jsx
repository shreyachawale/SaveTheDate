const makepayment=async()=>{
  const stripe=await loadStripe("pk_test_51Q3Aa0C7BPICGXUq8CPyRtBj3SskzQU74LQ6C1eNbX7vfqi4Ht4UncWocrZ47dRH1VL7L2lIwD84JHQPOrKVFXMr00uNsUJpdk")
const body={
  weddings:"test wedding"
}
const headers={
  "Content-Type":"application/json"
}
const response =fetch(`${api_Url}/create-checkout-session`,{
  method:"POST",
  headers:headers,
  body:JSON.stringify(body)
})
const session= await response.json();
const result =stripe.redirectToCheckout({
  sessionId:session.id
})

}
