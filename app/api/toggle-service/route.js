// import dbConnect from "../../utils/dbConnect";
// import Service from "../../models/service";

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === "PUT") {
//     const { id } = req.body;

//     try {
//       const service = await Service.findById(id);
//       if (!service) return res.status(404).json({ message: "Service not found" });

//       service.active = !service.active; // Toggle status
//       await service.save();

//       return res.status(200).json({ message: "Service status updated", service });
//     } catch (error) {
//       return res.status(500).json({ message: "Error updating service status" });
//     }
//   }
// }

