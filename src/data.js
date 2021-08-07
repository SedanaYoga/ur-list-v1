export const data = [
  {
    id: 1,
    type: "account",
    details: {
      name: "Vocus Passphrase",
      url: "https://vocus-eod.system.telflow.com/",
      theDetail: "fv$;g@5qD6L6",
    },
  },
  {
    id: 2,
    type: "account",
    details: {
      name: "FreeIpa",
      userName: "syoga@10.237.3.248",
      theDetail: "Z97_i7MW-h3k!",
    },
  },
  {
    id: 3,
    type: "account",
    details: {
      name: "Telflow UAT",
      url: "https://telflow-uat.vocus.local/",
      userName: "admin",
      theDetail: "Te4ewz3LC@E",
    },
  },
  {
    id: 4,
    type: "account",
    details: {
      name: "Inomial Dev",
      url: "https://vocus.inomial.net/dev/opng",
      userName: "syoga@dgitsystems.com",
      theDetail: "Bebek-Goreng-Mantap",
    },
  },
  {
    id: 5,
    type: "commandLine",
    details: {
      name: "Delete Supplier Address Workaround",
      theDetail:
        "sudo docker exec consul_10_201_110_253 consul kv delete telflow/app/tmf-641-ic/addressSupplier",
    },
  },
  {
    id: 6,
    type: "commandLine",
    details: {
      name: "Setup Decomp Manually Workaround",
      theDetail:
        "cd /home/vocus-user/susan/xslt/ ; sudo docker cp ./ telflow_decomposition_1:'/opt/telflow/integration-cartridge-decomposition/etc/'",
    },
  },
  {
    id: 7,
    type: "note",
    details: {
      name: "TMF Specification",
      theDetail:
        "- TMF673 - Address management system (It allows looking for worldwide addresses. It can also be used to validate geographic address data, to be sure that it corresponds to a real geographic address. Finally, it can be used to look for a geographic address by: searching an area as a start (city, town …), then zooming on the streets of this area, and finally listing all the street segments (numbers) in a street.).\n- TMF645 - Service Qualification (one of the Pre-Ordering Management APIs. Its goal is to provide service availability at Customer location).\n- TMF641 - Service Ordering (provides a standardized mechanism for placing a service order with all of the necessary order parameters. It allows users to create, update & retrieve Service Orders and manages related notifications.)\n- TMF637 Product Inventory Management (provides a standardized mechanism to retrieve product inventory information. The API consists of a simple set of operations that interact with Inventory systems in a consistent manner. Usually, a product is created and modified consequently to product order bit could be also ‘directly’ modified for administrative reason. )",
    },
  },
  {
    id: 8,
    type: "account",
    details: {
      name: "Dewayu",
      url: "https://google.com/",
      userName: "dewayudewayu",
      theDetail: "1234567",
    },
  },
  {
    id: 9,
    type: "account",
    details: {
      name: "Yuhumantap",
      url: "https://google.com/",
      userName: "yuhumantap",
      theDetail: "1234567",
    },
  },
  {
    id: 10,
    type: "bookmark",
    details: {
      name: "Web Developer Page",
      theDetail: "https://www.labnol.org/embed/google/photos/",
    },
  },
  {
    id: 11,
    type: "commandLine",
    details: {
      name: "create a tunneling between the jump host and the db host > ",
      theDetail:
        "ssh -L 9920:localhost:5432 -N -i /home/vocus-user/.ssh/id_rsa vocus-user@10.201.110.253",
    },
  },
  {
    id: 12,
    type: "commandLine",
    details: {
      name: "create a tunneling between the local to the jump host >",
      theDetail:
        "ssh -L 9921:localhost:9920 -N -i ~/.ssh/eod-dev.pem vocus-user@13.238.88.126",
    },
  },
  {
    id: 13,
    type: "commandLine",
    details: {
      name: "Tunneling SSH Telflow SIT Datastore",
      theDetail: "ssh -L 9922:localhost:5432 -N syoga@10.237.3.248",
    },
  },
];
