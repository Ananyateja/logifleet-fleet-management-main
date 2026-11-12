import { useState } from "react";
import "./App.css";

const initialVehicles = [
  {
    id: "VH-001",
    number: "AP39AB1234",
    type: "Heavy Truck",
    driver: "Rahul Kumar",
    location: "Visakhapatnam",
    status: "Available",
    fuel: "78%",
  },
  {
    id: "VH-002",
    number: "AP31CD5678",
    type: "Delivery Van",
    driver: "Arjun Reddy",
    location: "Vijayawada",
    status: "On Trip",
    fuel: "62%",
  },
  {
    id: "VH-003",
    number: "AP16EF9012",
    type: "Heavy Truck",
    driver: "Sanjay Rao",
    location: "Hyderabad",
    status: "Maintenance",
    fuel: "35%",
  },
  {
    id: "VH-004",
    number: "AP40GH3456",
    type: "Mini Truck",
    driver: "Vamsi Krishna",
    location: "Chennai",
    status: "Available",
    fuel: "91%",
  },
  {
    id: "VH-005",
    number: "AP28JK7890",
    type: "Container Truck",
    driver: "Kiran Kumar",
    location: "Bengaluru",
    status: "On Trip",
    fuel: "54%",
  },
];

const initialTrips = [
  {
    id: "TRP-1001",
    vehicle: "AP39AB1234",
    driver: "Rahul Kumar",
    from: "Visakhapatnam",
    to: "Hyderabad",
    distance: "625 km",
    date: "22 Sep 2026",
    status: "In Progress",
  },
  {
    id: "TRP-1002",
    vehicle: "AP31CD5678",
    driver: "Arjun Reddy",
    from: "Vijayawada",
    to: "Chennai",
    distance: "430 km",
    date: "21 Sep 2026",
    status: "Completed",
  },
  {
    id: "TRP-1003",
    vehicle: "AP40GH3456",
    driver: "Vamsi Krishna",
    from: "Visakhapatnam",
    to: "Bengaluru",
    distance: "760 km",
    date: "25 Sep 2026",
    status: "Scheduled",
  },
  {
    id: "TRP-1004",
    vehicle: "AP28JK7890",
    driver: "Kiran Kumar",
    from: "Hyderabad",
    to: "Bengaluru",
    distance: "570 km",
    date: "22 Sep 2026",
    status: "In Progress",
  },
];

const initialMaintenance = [
  {
    id: "MNT-001",
    vehicle: "AP16EF9012",
    service: "Engine Service",
    date: "22 Sep 2026",
    cost: "₹18,500",
    technician: "AutoCare Services",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "MNT-002",
    vehicle: "AP39AB1234",
    service: "Oil Change",
    date: "20 Sep 2026",
    cost: "₹4,200",
    technician: "Fleet Garage",
    priority: "Low",
    status: "Completed",
  },
  {
    id: "MNT-003",
    vehicle: "AP40GH3456",
    service: "Brake Inspection",
    date: "25 Sep 2026",
    cost: "₹7,800",
    technician: "Fleet Garage",
    priority: "Medium",
    status: "Scheduled",
  },
  {
    id: "MNT-004",
    vehicle: "AP28JK7890",
    service: "Tyre Replacement",
    date: "28 Sep 2026",
    cost: "₹22,000",
    technician: "RoadCare Motors",
    priority: "Medium",
    status: "Scheduled",
  },
];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("Dashboard");

  const [vehicles, setVehicles] = useState(initialVehicles);
  const [trips, setTrips] = useState(initialTrips);
  const [maintenance, setMaintenance] = useState(initialMaintenance);

  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showTripModal, setShowTripModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] =
    useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="app">

      <Sidebar
        page={page}
        setPage={setPage}
        logout={() => setLoggedIn(false)}
      />

      <main className="main">

        <Header page={page} />

        {page === "Dashboard" && (
          <Dashboard
            vehicles={vehicles}
            trips={trips}
            maintenance={maintenance}
            setPage={setPage}
          />
        )}

        {page === "Vehicles" && (
          <Vehicles
            vehicles={vehicles}
            setVehicles={setVehicles}
            showModal={showVehicleModal}
            setShowModal={setShowVehicleModal}
          />
        )}

        {page === "Trips" && (
          <Trips
            trips={trips}
            setTrips={setTrips}
            showModal={showTripModal}
            setShowModal={setShowTripModal}
            vehicles={vehicles}
          />
        )}

        {page === "Maintenance" && (
          <Maintenance
            maintenance={maintenance}
            setMaintenance={setMaintenance}
            showModal={showMaintenanceModal}
            setShowModal={setShowMaintenanceModal}
            vehicles={vehicles}
          />
        )}

        {page === "Tracking" && (
          <Tracking vehicles={vehicles} />
        )}

      </main>

    </div>
  );
}


/* ================= LOGIN ================= */

function Login({ onLogin }) {
  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-brand">
          <div className="login-logo">
            🚚
            </div>

          <h1>LogiFleet</h1>

          <p>Fleet Operations Platform</p>
        </div>

        <label>Username</label>

        <input
          placeholder="Enter username"
          defaultValue="admin"
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter password"
          defaultValue="1234"
        />

        <button
          className="login-button"
          onClick={onLogin}
        >
          Sign In
        </button>

        <div className="login-info">
          🔒 Secure Fleet Management
        </div>

      </div>

    </div>
  );
}


/* ================= SIDEBAR ================= */

function Sidebar({ page, setPage, logout }) {

  const items = [
    ["Dashboard", "▦"],
    ["Vehicles", "🚛"],
    ["Trips", "🛣"],
    ["Maintenance", "🔧"],
    ["Tracking", "📍"],
  ];

  return (
    <aside className="sidebar">

      <div className="brand">

        <div className="brand-logo">
          🚚
        </div>

        <div>
          <h2>LogiFleet</h2>
          <span>Fleet Operations</span>
        </div>

      </div>

      <div className="menu-title">
        MAIN MENU
      </div>

      {items.map(([name, icon]) => (

        <button
          key={name}
          className={
            page === name
              ? "menu active"
              : "menu"
          }
          onClick={() => setPage(name)}
        >
          <span className="menu-icon">
            {icon}
          </span>

          {name === "Tracking"
            ? "Live Tracking"
            : name}
        </button>

      ))}

      <div className="sidebar-bottom">

        <div className="system-status">
          <span></span>
          All Systems Operational
        </div>

        <div className="profile">

          <div className="avatar">
            A
          </div>

          <div>
            <b>Admin User</b>
            <small>Fleet Manager</small>
          </div>

        </div>

        <button
          className="logout"
          onClick={logout}
        >
          ⇥ &nbsp; Logout
        </button>

      </div>

    </aside>
  );
}


/* ================= HEADER ================= */

function Header({ page }) {

  return (
    <header className="topbar">

      <div>

        <h1>{page}</h1>

        <p>
          Welcome back, Admin 👋
        </p>

      </div>

      <div className="top-actions">

        <div className="notification">
          🔔
          <span>3</span>
        </div>

        <div className="avatar">
          A
        </div>

        <b>Admin</b>

        <span className="arrow">
          ▼
        </span>

      </div>

    </header>
  );
}


/* ================= DASHBOARD ================= */

function Dashboard({
  vehicles,
  trips,
  maintenance,
  setPage,
}) {

  const available = vehicles.filter(
    v => v.status === "Available"
  ).length;

  const onTrip = vehicles.filter(
    v => v.status === "On Trip"
  ).length;

  const inMaintenance = vehicles.filter(
    v => v.status === "Maintenance"
  ).length;

  return (
    <section>

      <div className="hero">

        <div className="hero-content">

          <span className="hero-label">
            FLEET OPERATIONS
          </span>

          <h2>
            Your fleet, under control.
          </h2>

          <p>
            Monitor vehicles, manage trips and
            keep maintenance on schedule.
          </p>

          <button
            onClick={() => setPage("Vehicles")}
          >
            Manage Vehicles →
          </button>

        </div>

        <div className="hero-truck">
          🚚
        </div>

      </div>


      <div className="stats">

        <Stat
          icon="🚚"
          title="Total Vehicles"
          value={vehicles.length}
        />

        <Stat
          icon="🟢"
          title="Available"
          value={available}
        />

        <Stat
          icon="🛣"
          title="On Trip"
          value={onTrip}
        />

        <Stat
          icon="🔧"
          title="Maintenance"
          value={inMaintenance}
        />

      </div>


      <div className="dashboard-grid">

        <div className="card">

          <div className="card-title">

            <h3>Recent Trips</h3>

            <button
              onClick={() => setPage("Trips")}
            >
              View All
            </button>

          </div>

          {trips.slice(0, 4).map(trip => (

            <div
              className="trip-row"
              key={trip.id}
            >

              <div className="row-icon">
                🚚
              </div>

              <div className="row-info">

                <b>{trip.vehicle}</b>

                <span>
                  {trip.from} → {trip.to}
                </span>

                <small>
                  Driver: {trip.driver}
                </small>

              </div>

              <Status status={trip.status} />

            </div>

          ))}

        </div>


        <div className="card">

          <div className="card-title">

            <h3>Maintenance Alerts</h3>

            <button
              onClick={() =>
                setPage("Maintenance")
              }
            >
              View All
            </button>

          </div>

          {maintenance.slice(0, 3).map(item => (

            <Alert
              key={item.id}
              icon={
                item.priority === "High"
                  ? "⚠️"
                  : item.status === "Completed"
                    ? "✓"
                    : "🔧"
              }
              title={item.service}
              text={`${item.vehicle} • ${item.date}`}
              type={
                item.priority === "High"
                  ? "danger"
                  : item.status === "Completed"
                    ? "success"
                    : "warning"
              }
            />

          ))}

        </div>

      </div>


      <div className="overview-card">

        <div>
          <span>FLEET UTILIZATION</span>
          <h3>78%</h3>
        </div>

        <div className="progress-container">
          <div className="progress">
            <div
              className="progress-value"
              style={{ width: "78%" }}
            ></div>
          </div>

          <small>
            94 of 120 vehicles actively utilized
          </small>
        </div>

        <div className="overview-stat">
          <b>94</b>
          <span>Active</span>
        </div>

        <div className="overview-stat">
          <b>26</b>
          <span>Idle</span>
        </div>

      </div>

    </section>
  );
}


/* ================= VEHICLES ================= */

function Vehicles({
  vehicles,
  setVehicles,
  showModal,
  setShowModal,
}) {

  const [search, setSearch] = useState("");

  const filtered = vehicles.filter(v =>
    v.number.toLowerCase().includes(
      search.toLowerCase()
    ) ||
    v.driver.toLowerCase().includes(
      search.toLowerCase()
    ) ||
    v.location.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  function addVehicle(e) {

    e.preventDefault();

    const form = new FormData(e.target);

    const vehicle = {
      id: `VH-${String(
        vehicles.length + 1
      ).padStart(3, "0")}`,

      number: form.get("number"),

      type: form.get("type"),

      driver: form.get("driver"),

      location: form.get("location"),

      status: "Available",

      fuel: "100%",
    };

    setVehicles([
      ...vehicles,
      vehicle,
    ]);

    setShowModal(false);

    e.target.reset();
  }

  return (
    <section>

      <div className="page-header">

        <div>
          <h2>Vehicle Management</h2>

          <p>
            Manage fleet vehicles, drivers,
            locations and availability.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          + Add Vehicle
        </button>

      </div>


      <div className="mini-stats">

        <MiniStat
          label="Total"
          value={vehicles.length}
        />

        <MiniStat
          label="Available"
          value={
            vehicles.filter(
              v => v.status === "Available"
            ).length
          }
        />

        <MiniStat
          label="On Trip"
          value={
            vehicles.filter(
              v => v.status === "On Trip"
            ).length
          }
        />

        <MiniStat
          label="Maintenance"
          value={
            vehicles.filter(
              v => v.status === "Maintenance"
            ).length
          }
        />

      </div>


      <div className="table-card">

        <div className="table-header">

          <div>
            <h3>Fleet Vehicles</h3>
            <span>
              {filtered.length} vehicles found
            </span>
          </div>

          <input
            placeholder="🔍 Search vehicle, driver..."
            value={search}
            onChange={e =>
              setSearch(e.target.value)
            }
          />

        </div>

        <table>

          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Type</th>
              <th>Driver</th>
              <th>Location</th>
              <th>Fuel</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map(vehicle => (

              <tr key={vehicle.id}>

                <td>
                  <b>{vehicle.number}</b>
                  <small>{vehicle.id}</small>
                </td>

                <td>{vehicle.type}</td>

                <td>{vehicle.driver}</td>

                <td>
                  📍 {vehicle.location}
                </td>

                <td>
                  <div className="fuel">
                    <div>
                      <span
                        style={{
                          width: vehicle.fuel
                        }}
                      ></span>
                    </div>
                    {vehicle.fuel}
                  </div>
                </td>

                <td>
                  <Status
                    status={vehicle.status}
                  />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {showModal && (

        <Modal
          title="Add New Vehicle"
          close={() => setShowModal(false)}
        >

          <form
            onSubmit={addVehicle}
            className="modal-form"
          >

            <label>Vehicle Number</label>
            <input
              name="number"
              placeholder="AP39XY1234"
              required
            />

            <label>Vehicle Type</label>
            <select name="type">
              <option>Heavy Truck</option>
              <option>Delivery Van</option>
              <option>Mini Truck</option>
              <option>Container Truck</option>
            </select>

            <label>Driver Name</label>
            <input
              name="driver"
              placeholder="Driver name"
              required
            />

            <label>Current Location</label>
            <input
              name="location"
              placeholder="Visakhapatnam"
              required
            />

            <button
              className="primary-button"
            >
              Add Vehicle
            </button>

          </form>

        </Modal>

      )}

    </section>
  );
}


/* ================= TRIPS ================= */

function Trips({
  trips,
  setTrips,
  showModal,
  setShowModal,
  vehicles,
}) {

  function createTrip(e) {

    e.preventDefault();

    const form = new FormData(e.target);

    const trip = {
      id: `TRP-${1001 + trips.length}`,

      vehicle: form.get("vehicle"),

      driver: form.get("driver"),

      from: form.get("from"),

      to: form.get("to"),

      distance: "TBD",

      date: form.get("date"),

      status: "Scheduled",
    };

    setTrips([
      ...trips,
      trip,
    ]);

    setShowModal(false);

    e.target.reset();
  }

  return (
    <section>

      <div className="page-header">

        <div>
          <h2>Trip Dispatch</h2>

          <p>
            Assign vehicles and monitor
            the complete trip lifecycle.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          + Create Trip
        </button>

      </div>


      <div className="mini-stats">

        <MiniStat
          label="Total Trips"
          value={trips.length}
        />

        <MiniStat
          label="In Progress"
          value={
            trips.filter(
              t => t.status === "In Progress"
            ).length
          }
        />

        <MiniStat
          label="Completed"
          value={
            trips.filter(
              t => t.status === "Completed"
            ).length
          }
        />

        <MiniStat
          label="Scheduled"
          value={
            trips.filter(
              t => t.status === "Scheduled"
            ).length
          }
        />

      </div>


      <div className="table-card">

        <div className="table-header">

          <div>
            <h3>Trip Dispatch Board</h3>

            <span>
              Manage all vehicle trips
            </span>
          </div>

          <input
            placeholder="🔍 Search trips..."
          />

        </div>

        <table>

          <thead>

            <tr>
              <th>Trip ID</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Route</th>
              <th>Distance</th>
              <th>Date</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {trips.map(trip => (

              <tr key={trip.id}>

                <td>
                  <b>{trip.id}</b>
                </td>

                <td>
                  {trip.vehicle}
                </td>

                <td>
                  {trip.driver}
                </td>

                <td>
                  <strong>
                    {trip.from}
                  </strong>
                  {" → "}
                  <strong>
                    {trip.to}
                  </strong>
                </td>

                <td>
                  {trip.distance}
                </td>

                <td>
                  {trip.date}
                </td>

                <td>
                  <Status
                    status={trip.status}
                  />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {showModal && (

        <Modal
          title="Create New Trip"
          close={() => setShowModal(false)}
        >

          <form
            className="modal-form"
            onSubmit={createTrip}
          >

            <label>Vehicle</label>

            <select name="vehicle">

              {vehicles
                .filter(
                  v =>
                    v.status === "Available"
                )
                .map(v => (

                  <option
                    key={v.id}
                    value={v.number}
                  >
                    {v.number} — {v.driver}
                  </option>

                ))}

            </select>

            <label>Driver</label>

            <input
              name="driver"
              placeholder="Driver name"
              required
            />

            <label>Source</label>

            <input
              name="from"
              placeholder="Visakhapatnam"
              required
            />

            <label>Destination</label>

            <input
              name="to"
              placeholder="Hyderabad"
              required
            />

            <label>Trip Date</label>

            <input
              name="date"
              type="date"
              required
            />

            <button
              className="primary-button"
            >
              Create Trip
            </button>

          </form>

        </Modal>

      )}

    </section>
  );
}


/* ================= MAINTENANCE ================= */

function Maintenance({
  maintenance,
  setMaintenance,
  showModal,
  setShowModal,
  vehicles,
}) {

  function addMaintenance(e) {

    e.preventDefault();

    const form = new FormData(e.target);

    const item = {

      id: `MNT-${String(
        maintenance.length + 1
      ).padStart(3, "0")}`,

      vehicle: form.get("vehicle"),

      service: form.get("service"),

      date: form.get("date"),

      cost: `₹${form.get("cost")}`,

      technician: form.get("technician"),

      priority: form.get("priority"),

      status: "Scheduled",
    };

    setMaintenance([
      ...maintenance,
      item,
    ]);

    setShowModal(false);

    e.target.reset();
  }

  return (
    <section>

      <div className="page-header">

        <div>
          <h2>Maintenance Management</h2>

          <p>
            Track repairs, work orders and
            preventive vehicle maintenance.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          + Schedule Service
        </button>

      </div>


      <div className="mini-stats">

        <MiniStat
          label="Total Records"
          value={maintenance.length}
        />

        <MiniStat
          label="In Progress"
          value={
            maintenance.filter(
              m => m.status === "In Progress"
            ).length
          }
        />

        <MiniStat
          label="Completed"
          value={
            maintenance.filter(
              m => m.status === "Completed"
            ).length
          }
        />

        <MiniStat
          label="Scheduled"
          value={
            maintenance.filter(
              m => m.status === "Scheduled"
            ).length
          }
        />

      </div>


      <div className="table-card">

        <div className="table-header">

          <div>
            <h3>Maintenance Work Orders</h3>

            <span>
              Vehicle repair and service history
            </span>
          </div>

          <input
            placeholder="🔍 Search work order..."
          />

        </div>

        <table>

          <thead>

            <tr>
              <th>Work Order</th>
              <th>Vehicle</th>
              <th>Service</th>
              <th>Date</th>
              <th>Cost</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {maintenance.map(item => (

              <tr key={item.id}>

                <td>
                  <b>{item.id}</b>
                </td>

                <td>
                  {item.vehicle}
                </td>

                <td>
                  {item.service}
                </td>

                <td>
                  {item.date}
                </td>

                <td>
                  <strong>
                    {item.cost}
                  </strong>
                </td>

                <td>
                  <Priority
                    value={item.priority}
                  />
                </td>

                <td>
                  <Status
                    status={item.status}
                  />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {showModal && (

        <Modal
          title="Schedule Maintenance"
          close={() => setShowModal(false)}
        >

          <form
            className="modal-form"
            onSubmit={addMaintenance}
          >

            <label>Vehicle</label>

            <select name="vehicle">

              {vehicles.map(v => (

                <option
                  key={v.id}
                  value={v.number}
                >
                  {v.number}
                </option>

              ))}

            </select>

            <label>Service Type</label>

            <input
              name="service"
              placeholder="Engine Service"
              required
            />

            <label>Service Date</label>

            <input
              name="date"
              type="date"
              required
            />

            <label>Estimated Cost</label>

            <input
              name="cost"
              placeholder="18500"
              required
            />

            <label>Technician / Garage</label>

            <input
              name="technician"
              placeholder="Fleet Garage"
              required
            />

            <label>Priority</label>

            <select name="priority">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <button
              className="primary-button"
            >
              Schedule Maintenance
            </button>

          </form>

        </Modal>

      )}

    </section>
  );
}


/* ================= TRACKING ================= */

function Tracking({ vehicles }) {

  return (
    <section>

      <div className="page-header">

        <div>
          <h2>Live Vehicle Tracking</h2>

          <p>
            Monitor current fleet locations
            and vehicle availability.
          </p>
        </div>

        <div className="live">
          <span></span>
          LIVE
        </div>

      </div>


      <div className="tracking-layout">

        <div className="map">

          <div className="map-label">
            🗺 Fleet Location Map
          </div>

          <div className="city city-one">
            Visakhapatnam
          </div>

          <div className="city city-two">
            Vijayawada
          </div>

          <div className="city city-three">
            Hyderabad
          </div>

          <div className="city city-four">
            Chennai
          </div>

          <div className="map-line line-one"></div>
          <div className="map-line line-two"></div>
          <div className="map-line line-three"></div>

          <div className="vehicle-marker marker-one">
            🚚
            <small>AP39AB1234</small>
          </div>

          <div className="vehicle-marker marker-two">
            🚚
            <small>AP31CD5678</small>
          </div>

          <div className="vehicle-marker marker-three">
            🚚
            <small>AP16EF9012</small>
          </div>

          <div className="vehicle-marker marker-four">
            🚚
            <small>AP40GH3456</small>
          </div>

        </div>


        <div className="tracking-panel">

          <div className="panel-title">
            <h3>Active Fleet</h3>

            <span>
              {vehicles.length} vehicles
            </span>
          </div>

          {vehicles.map(vehicle => (

            <div
              className="tracking-item"
              key={vehicle.id}
            >

              <div className="tracking-icon">
                🚛
              </div>

              <div className="tracking-info">

                <b>
                  {vehicle.number}
                </b>

                <small>
                  📍 {vehicle.location}
                </small>

                <small>
                  Fuel: {vehicle.fuel}
                </small>

              </div>

              <Status
                status={vehicle.status}
              />

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}


/* ================= COMPONENTS ================= */

function Stat({
  icon,
  title,
  value,
}) {

  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>

      </div>

    </div>
  );
}


function MiniStat({
  label,
  value,
}) {

  return (
    <div className="mini-stat">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


function Status({ status }) {

  let type = "blue";

  if (
    status === "Available" ||
    status === "Completed"
  ) {
    type = "green";
  }

  if (
    status === "On Trip" ||
    status === "In Progress"
  ) {
    type = "orange";
  }

  return (
    <span className={`status ${type}`}>
      ● {status}
    </span>
  );
}


function Priority({ value }) {

  const type =
    value === "High"
      ? "danger"
      : value === "Medium"
        ? "warning"
        : "success";

  return (
    <span className={`priority ${type}`}>
      {value}
    </span>
  );
}


function Alert({
  icon,
  title,
  text,
  type,
}) {

  return (
    <div className="alert">

      <div className={`alert-icon ${type}`}>
        {icon}
      </div>

      <div>

        <b>{title}</b>

        <span>
          {text}
        </span>

      </div>

    </div>
  );
}


function Modal({
  title,
  close,
  children,
}) {

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>{title}</h2>

          <button onClick={close}>
            ×
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}

export default App;