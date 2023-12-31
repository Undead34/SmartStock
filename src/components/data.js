import { v4 as uuid } from "uuid";

export const info = [
  {
    "id": "36064933-13f1-460f-8d81-8392857969b1",
    "equipment_name": "Tecno Pova 4",
    "equipment_type": "Smartphone",
    "serial_number": "GL-200719",
    "model": "Pova 4",
    "code": "B0D8EE8E",
    "entry_date": "2023-08-23T04:00:00.000Z",
    "observation": "Android 12, Helio G99, Front 8M, Back 50M Dual Camera, RAM 8 GB + 5 GB ampliables, ROM 128.00 GB, Batería 6000mAh, Pantalla 720x1640.El dispositivo esta usado pero el estado es bueno y ya fue verificado.",
    "location": "Venezuela",
    "stock": 1
  },
  {
    "id": "ddafc431-bbca-42fb-952b-b96fbd4f954f",
    "equipment_name": "Dell Latitude 3420",
    "equipment_type": "Laptop",
    "serial_number": "H0RHJL3",
    "model": "Latitude 3420",
    "code": "5DC7B75A",
    "entry_date": "2023-08-23T04:00:00.000Z",
    "observation": "Laptop Dell Latitude 3420\nEstado: Nueva\nRAM 8GB, Windows 11, 512 GB SSD M.2, Resolución 1366x768, Intel Core I7-1165G7 @ 2.80GHz",
    "location": "Venezuela",
    "stock": 1
  }
]

export const customers = [
  {
    id: uuid(),
    customer_name: "Microsoft",
    customer_email: "hello@microsoft.com",
    customer_country: "United States",
    code: "US-MS001",
    observation: "Microsoft is the largest vendor of computer software in the world",
  },
  {
    id: uuid(),
    customer_name: "Riot Games",
    customer_email: "hello@riotgames.com",
    customer_country: "United States",
    code: "US-RG002",
    observation: "Riot Games was founded in 2006 to develop, publish, and support the most player-focused games in the world",
  },
  {
    id: uuid(),
    customer_name: "Apple Inc.",
    customer_email: "hello@apple.com",
    customer_country: "United States",
    code: "US-AP003",
    observation: "Apple is known for its innovative products, including the iPhone, iPad, and MacBook",
  },
  {
    id: uuid(),
    customer_name: "Amazon",
    customer_email: "hello@amazon.com",
    customer_country: "United States",
    code: "US-AM004",
    observation: "Amazon started as an online bookstore and has since become one of the world's largest e-commerce and cloud computing companies",
  },
  {
    id: uuid(),
    customer_name: "Google",
    customer_email: "hello@google.com",
    customer_country: "United States",
    code: "US-GO005",
    observation: "Google is a multinational technology company that specializes in internet-related services and products",
  },
  {
    id: uuid(),
    customer_name: "Samsung",
    customer_email: "hello@samsung.com",
    customer_country: "South Korea",
    code: "SK-SA001",
    observation: "Samsung is a leading manufacturer of consumer electronics, including smartphones, TVs, and appliances",
  },
  {
    id: uuid(),
    customer_name: "Facebook",
    customer_email: "hello@facebook.com",
    customer_country: "United States",
    code: "US-FB006",
    observation: "Facebook is a social networking platform connecting billions of people worldwide",
  },
  {
    id: uuid(),
    customer_name: "Toyota",
    customer_email: "hello@toyota.com",
    customer_country: "Japan",
    code: "JP-TO010",
    observation: "Toyota is one of the largest automobile manufacturers, known for its reliable and innovative vehicles",
  },
  {
    id: uuid(),
    customer_name: "Alibaba Group",
    customer_email: "hello@alibaba.com",
    customer_country: "China",
    code: "CN-AL008",
    observation: "Alibaba is a conglomerate specializing in e-commerce, retail, internet, and technology",
  },
  {
    id: uuid(),
    customer_name: "Netflix",
    customer_email: "hello@netflix.com",
    customer_country: "United States",
    code: "US-NF009",
    observation: "Netflix is a streaming service offering a wide variety of TV shows, movies, documentaries, and more",
  },
];

export const control = [
  {
    id: uuid(),
    equipment_name: "Corsair K70 RGB MK.2",
    equipment_type: "Keyboard",
    code: "KEYBOARD01",
    observation: "Corsair K70 RGB MK.2 | Mechanical Gaming Keyboard | Cherry MX Brown Switches | RGB Backlit",
    stock: 10,
    sold: 10,
  },
]

export const tracking = [
  {
    id: uuid(),
    order_code: "654321",
    customer_name: "Microsoft",
    customer_code: "US-MS001",
    observation: "En camino",
    entry_date: "N/A",
    departure_date: "N/A",
    arrival_date: new Date(2023, 6, 15),
    status: "En Stock",
    code: "KEYBOARD01",
    amount: 20,
  },
  {
    id: uuid(),
    order_code: "654321",
    customer_name: "Microsoft",
    customer_code: "US-MS001",
    observation: "En camino",
    entry_date: new Date(2023, 6, 15),
    departure_date: "N/A",
    arrival_date: "N/A",
    status: "Enviado  ",
    code: "KEYBOARD01",
    amount: 20,
  },
  {
    id: uuid(),
    supplier_name: "Microsoft",
    code: "KEYBOARD01",
    amount: 20,
    entry_date: "N/A",
    departure_date: new Date(2023, 6, 15),
    arrival_date: "N/A",
    status: "Llegó",
    observation: "En camino",
    customer_code: "US-MS001",
  },
]


// id: uuid(),
// supplier_name: event.target.supplier_name.value.trim(),
// equipment_name: event.target.equipment_name.value.trim(),
// stock: event.target.stock.value.trim(),
// entry_date: parseUserDate(event.target.entry_date.value),
// arrival_date: event.target.arrival_date.value.trim(),
// code: custom.value,
// status: event.target.status.value.trim(),
// observation: event.target.observation.value.trim(),