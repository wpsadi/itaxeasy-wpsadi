import { Loader2, TriangleAlert } from "lucide-react";

import { useAPIEndpointQeuery } from "@/services/apis-section/getEndpointData";

import { AddToCartButtonRender } from "./AddtoCartButtonRender";

export const RenderAPIEndpoint = ({ apiId }: { apiId: string }) => {
  const apiEndpointDataQuery = useAPIEndpointQeuery(apiId);
  if (apiEndpointDataQuery.isPending) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      </>
    );
  }

  if (apiEndpointDataQuery.isError) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          Error loading the page. Please try again later.
        </div>
      </>
    );
  }

  const apiData =apiEndpointDataQuery.data?.data

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto my-10">
        <h1 className="text-center font-semibold text-2xl">{apiData.title}</h1>
        <div className="mt-8">
          <h5 className="heading-5">Overview</h5>
          <p className="description mt-2">{apiData.description}</p>
        </div>
        <div className="flex p-3 mt-5 bg-[#f0f0f1] rounded font-semibold justify-between items-center">
          <div className="flex text-2xl ">
            <h1 className="heading-4">Price :</h1>
            <div className="ml-2 heading-4">₹ {apiData.price} monthly</div>
          </div>
          <div>
            <AddToCartButtonRender apiId={apiId} />
          </div>
        </div>
        <div className="mt-8">
          <h5 className="heading-5">Endpoint</h5>
          <table className="border-collapse w-full mt-2 text-sm">
            <thead>
              <tr className="text-left bg-zinc-200">
                <th className="border px-5 py-2">HTTP Method</th>
                <th className="border px-5 py-2">Endpoint</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-left">
                <td className="border px-5 py-2 uppercase">
                  {apiData?.endpoint?.method}
                </td>
                <td className="border px-5 py-2">
                  {apiData?.endpoint?.endpoint}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
            {!apiData.upcoming ? (
              <>
                {apiData.headers && (
                  <div className="mt-8">
                    <h5 className="font-medium text-xl">Headers</h5>
                    <table className="table-auto border w-full mt-2 text-sm">
                      <thead>
                        <tr className="text-left bg-zinc-200">
                          <th className="px-3 py-3">Name</th>
                          <th className="px-3 py-3">Type</th>
                          <th className="px-3 py-3">Required</th>
                          <th className="px-3 py-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apiData.headers.map((element, i) => (
                          <tr
                            key={i}
                            className="text-left odd:bg-white even:bg-zinc-100"
                          >
                            <td className="px-3 py-5 border">{element.name}</td>
                            <td className="px-3 py-5 border">{element.type}</td>
                            <td className="px-3 py-5 border">
                              {element.required}
                            </td>
                            <td className="px-3 py-5 border">
                              {element.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {apiData.queryParams && (
                  <div className="mt-8">
                    <h5 className="font-medium text-xl">Query Parameters</h5>
                    <table className="table-auto border w-full mt-2 text-sm">
                      <thead>
                        <tr className="text-left bg-zinc-200">
                          <th className="px-3 py-3">Name</th>
                          <th className="px-3 py-3">Type</th>
                          <th className="px-3 py-3">Required</th>
                          <th className="px-3 py-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apiData.queryParams.map((element, i) => (
                          <tr
                            key={i}
                            className="text-left odd:bg-white even:bg-zinc-100"
                          >
                            <td className="px-3 py-5 border">{element.name}</td>
                            <td className="px-3 py-5 border">{element.type}</td>
                            <td className="px-3 py-5 border">
                              {element.required}
                            </td>
                            <td className="px-3 py-5 border">
                              {element.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {apiData.bodyParams && (
                  <div className="mt-8">
                    <h5 className="heading-5">Body Parameters</h5>
                    <table className="table-auto border w-full mt-2 text-sm">
                      <thead>
                        <tr className="text-left bg-zinc-200">
                          <th className="px-3 py-3">Name</th>
                          <th className="px-3 py-3">Type</th>
                          <th className="px-3 py-3">Required</th>
                          <th className="px-3 py-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apiData.bodyParams.map((element) => (
                          <tr
                            key={element.name}
                            className="text-left odd:bg-white even:bg-zinc-100"
                          >
                            <td className="px-3 py-5 border">{element.name}</td>
                            <td className="px-3 py-5 border">{element.type}</td>
                            <td className="px-3 py-5 border">
                              {element.required}
                            </td>
                            <td className="px-3 py-5 border">
                              {element.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="mt-8">
                  <h5 className="heading-5">Response Body</h5>
                  <table className="table-auto border w-full mt-2 text-sm">
                    <thead>
                      <tr className="text-left bg-zinc-200">
                        <th className="px-3 py-3">Name</th>
                        <th className="px-3 py-3">Type</th>
                        <th className="px-3 py-3">Required</th>
                        <th className="px-3 py-3">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiData.response?.map((element, i) => (
                        <tr
                          key={i}
                          className="text-left odd:bg-white even:bg-zinc-100"
                        >
                          <td className="px-3 py-5 border">{element.name}</td>
                          <td className="px-3 py-5 border">{element.type}</td>
                          <td className="px-3 py-5 border">
                            {element.required}
                          </td>
                          <td className="px-3 py-5 border">
                            {element.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <code className="block bg-zinc-100 rounded-md px-8 py-5 mt-5 overflow-x-auto">
                  <pre className="whitespace-pre">{JSON.stringify(apiData?.responseJSON, null, 2) || ""}</pre>
                </code>
              </>
            ) : (
              <div className="flex p-3 bg-red-200 mt-10 text-red-500 fill-current justify-center text-xl ">
                <div className=" flex items-center gap-2">
                <TriangleAlert /> Error code : 503 Api under Maintainence
                </div>
              </div>
            )}
          </div>
      </div>

      
    </div>
  );
};
