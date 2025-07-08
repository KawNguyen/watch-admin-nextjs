// "use client";
// import React from "react";
// import { columns, Review } from "./columns";
// import DataTable from "./data-tables";
// const data: Review[] = [
//   {
//     id: "1",
//     name: "PRX",
//     totalComment: 100,
//   },
// ];
// const ReviewPage = () => {
//   return (
//     <div>
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// };

import React from 'react';
// export default ReviewPage;
import { ReviewManagement } from '@/components/ReviewManagement/ReviewManagement';

const ReviewPage = () => {
  return <ReviewManagement />;
};

export default ReviewPage;
