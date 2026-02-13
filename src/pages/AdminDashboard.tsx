import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { time } from "console";

const AdminDashboard = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const navigate = useNavigate();

  // 🔐 Admin Protection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "mohanmanivannan123@gmail.com") {
        navigate("/");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  // ✅ Approve Request
  const handleApproveRequest = async (id: string) => {
    await updateDoc(doc(db, "requests", id), {
      status: "Approved",
    });

    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
  };

  // ✅ Finish Donation
  const handleFinishDonation = async (id: string) => {
    await updateDoc(doc(db, "donations", id), {
      finished: true,
    });

    setDonations((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, finished: true } : d
      )
    );
  };

  // ✅ Finish Request
  const handleFinishRequest = async (id: string) => {
    await updateDoc(doc(db, "requests", id), {
      finished: true,
    });

    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, finished: true } : r
      )
    );
  };

  // 📥 Fetch Data
  useEffect(() => {
    if (loading) return;

    const fetchData = async () => {
      const donationSnap = await getDocs(collection(db, "donations"));
      const requestSnap = await getDocs(collection(db, "requests"));

      setDonations(
        donationSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      setRequests(
        requestSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    fetchData();
  }, [loading]);

  // 🔢 Urgency Priority
  const urgencyPriority: any = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  // === FILTERING ===

  const activeDonations = donations.filter((d) => !d.finished);
  const finishedDonations = donations.filter((d) => d.finished);

  const pendingRequests = requests
    .filter((r) => !r.finished && r.status !== "Approved")
    .sort(
      (a, b) =>
        urgencyPriority[a.urgencyLevel] -
        urgencyPriority[b.urgencyLevel]
    );

  const approvedRequests = requests
    .filter((r) => !r.finished && r.status === "Approved")
    .sort(
      (a, b) =>
        urgencyPriority[a.urgencyLevel] -
        urgencyPriority[b.urgencyLevel]
    );

  const finishedRequests = requests.filter((r) => r.finished);

  // 📊 Excel Export
  const exportToExcel = () => {
    const donationData = donations.map((d) => ({
      Name: d.donorName,
      Email: d.email,
      Phone: d.contactNumber,
      FoodType: d.foodType,
      Address: d.address,
      ExpiryTime: d.expiryTime,

      Status: d.finished ? "Finished" : "Active",
    }));

    const requestData = requests.map((r) => ({
      Organization: r.organizationName,
      Contact: r.contactPerson,
      Phone: r.contactNumber,
      Urgency: r.urgencyLevel,
      Address: r.address,
      preferredTime: r.preferredTime,
      contactPerson: r.contactPerson,

      Status: r.finished
        ? "Finished"
        : r.status || "Pending",
    }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(donationData),
      "Donations"
    );
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(requestData),
      "Requests"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([excelBuffer]),
      "Pasithulir_Admin_Data.xlsx"
    );
  };

  if (loading)
    return <h2 style={{ padding: "40px" }}>Checking Access...</h2>;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg,#1f2937,#111827)",
        color: "white",
        fontFamily: "Segoe UI",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        Admin Dashboard
      </h1>

      <button
        onClick={exportToExcel}
        style={{
          background: "#10b981",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        Download Excel
      </button>

      {/* ===== DONATIONS ===== */}

      <SectionTitle
        title={`Active Donations (${activeDonations.length})`}
      />
      {activeDonations.map((d) => (
        <Card key={d.id}>
          <p><b>{d.donorName}</b></p>
          <p>{d.foodType}</p>
          <p>{d.contactNumber}</p>
          <p>{d.email}</p>
          <p>{d.address}</p>
          <p>Expires: {new Date(d.expiryTime).toLocaleString()}</p>

          <ButtonPurple
            onClick={() => handleFinishDonation(d.id)}
          >
            Mark as Finished
          </ButtonPurple>
        </Card>
      ))}

      <SectionTitle
        title={`Finished Donations (${finishedDonations.length})`}
      />
      {finishedDonations.map((d) => (
        <Card key={d.id} finished>
          <p><b>{d.donorName}</b></p>
          <p>{d.foodType}</p>
          <p>{d.contactNumber}</p>
          <p>{d.email}</p>
          <p>{d.address}</p>
          <p>Expired: {new Date(d.expiryTime).toLocaleString()}</p>

          <p>Status: Finished</p>
        </Card>
      ))}

      {/* ===== REQUESTS ===== */}

      <SectionTitle
        title={`Pending Requests (${pendingRequests.length})`}
      />
      {pendingRequests.map((r) => (
        <Card key={r.id} warning>
          <p><b>{r.organizationName}</b></p>
          <p>Urgency: {r.urgencyLevel}</p>
          <p>{r.contactPerson}</p>
          <p>{r.contactNumber}</p>
          <p>{r.address}</p>
          <p>Preferred Time: {new Date(r.preferredTime).toLocaleString()}</p>
          <p>Status: Pending</p>
          <ButtonBlue
            onClick={() => handleApproveRequest(r.id)}
          >
            Approve
          </ButtonBlue>
        </Card>
      ))}

      <SectionTitle
        title={`Approved Requests (${approvedRequests.length})`}
      />
      {approvedRequests.map((r) => (
        <Card key={r.id} success>
          <p><b>{r.organizationName}</b></p>
          <p>Urgency: {r.urgencyLevel}</p>
          <p>{r.contactPerson}</p>
          <p>{r.contactNumber}</p>
          <p>{r.address}</p>
          <p>Preferred Time: {new Date(r.preferredTime).toLocaleString()}</p>

          <p>Status: Approved</p>
          <ButtonPurple
            onClick={() => handleFinishRequest(r.id)}
          >
            Mark as Finished
          </ButtonPurple>
        </Card>
      ))}

      <SectionTitle
        title={`Finished Requests (${finishedRequests.length})`}
      />
      {finishedRequests.map((r) => (
        <Card key={r.id} finished>
          <p><b>{r.organizationName}</b></p>
          <p>Urgency: {r.urgencyLevel}</p>
          <p>{r.contactPerson}</p>
          <p>{r.contactNumber}</p>
          <p>{r.address}</p>
          <p>Preferred Time: {new Date(r.preferredTime).toLocaleString()}</p>
          <p>Status: Finished</p>
        </Card>
      ))}
    </div>
  );
};

/* ======================
   PREMIUM UI COMPONENTS
====================== */

const Card = ({
  children,
  warning,
  success,
  finished,
}: any) => (
  <div
    style={{
      background: finished
        ? "#07090f"
        : success
        ? "#0e9cc3"
        : warning
        ? "#78350f"
        : "#23262c",
      padding: "15px",
      borderRadius: "12px",
      marginBottom: "15px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
    }}
  >
    {children}
  </div>
);

const SectionTitle = ({ title }: any) => (
  <h2 style={{ marginTop: "40px", marginBottom: "15px" }}>
    {title}
  </h2>
);

const ButtonBlue = ({ children, onClick }: any) => (
  <button
    onClick={onClick}
    style={{
      background: "#2563eb",
      color: "white",
      padding: "6px 12px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      marginTop: "10px",
    }}
  >
    {children}
  </button>
);

const ButtonPurple = ({ children, onClick }: any) => (
  <button
    onClick={onClick}
    style={{
      background: "#1ebdd5",
      color: "white",
      padding: "6px 12px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      marginTop: "10px",
    }}
  >
    {children}
  </button>
);

export default AdminDashboard;
