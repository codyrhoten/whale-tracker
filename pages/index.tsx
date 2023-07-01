import { useEffect } from 'react'


export default function Home() {
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/get-contract-for-owner');
            const data = await response.json();
            // Process the retrieved data here
            console.log(data);
          } catch (error) {
            // Handle any errors that occurred during the fetch request
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Call the async function to initiate the fetch request
    
        // Cleanup function (optional)
        return () => {
          // Perform any necessary cleanup here (e.g., cancel any pending requests)
        };
      }, []);   

  return (
    <>
    </>
  )
}
