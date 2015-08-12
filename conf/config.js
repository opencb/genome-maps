/**
 * This is a configuration file.
 * Changes to this file may cause the application does not work as it should
 **/

// Default
OPENCGA_VERSION = "v1";
OPENCGA_HOST = "http://ws.babelomics.org/opencga";

CELLBASE_VERSION = "v3";
CELLBASE_HOST = "http://bioinfodev.hpc.cam.ac.uk/cellbase";

// Development
OPENCGA_VERSION = "v1";
//OPENCGA_HOST = "http://test.babelomics.org/opencga";
OPENCGA_HOST = "http://bioinfodev.hpc.cam.ac.uk/opencga";

CELLBASE_VERSION = "v3";
CELLBASE_HOST = "http://bioinfodev.hpc.cam.ac.uk/cellbase";

var SPECIES_TRACKS_GROUP = {

    "hsapiens": "group1",
    "mmusculus": "group1",
    "rnorvegicus": "group1",
    "ptroglodytes": "group1",
    "ggorilla": "group1",
    "pabelii": "group1",
    "mmulatta": "group1",
    "sscrofa": "group1",
    "cfamiliaris": "group1",
    "ecaballus": "group1",
    "ocuniculus": "group1",
    "ggallus": "group1",
    "btaurus": "group1",
    "fcatus": "group1",
    "drerio": "group1",
    "cintestinalis": "group1",
    "dmelanogaster": "group1",
    "dsimulans": "group1",
    "dyakuba": "group1",
    "agambiae": "group1",
    "celegans": "group1",
    "scerevisiae": "group1",
    "spombe": "group1",
    "afumigatus": "group1",
    "aniger": "group1",
    "anidulans": "group1",
    "aoryzae": "group1",
    "pfalciparum": "group1",
    "lmajor": "group1",
    "athaliana": "group1",
    "alyrata": "group1",
    "bdistachyon": "group1",
    "osativa": "group1",
    "gmax": "group1",
    "vvinifera": "group1",
    "zmays": "group1",
    "cclementina": "group1",

    "hsa": "group1",
    "mmu": "group2",
    "rno": "group2",
    "dre": "group2",
    "rno": "group2",
    "dme": "group2",
    "sce": "group2",
    "cel": "group2",
    "ssc": "group2",
    "cfa": "group3",
    "aga": "group3",
    "pfa": "group3",
    "ccl": "group1"
};

var TRACKS = {
    "group1": [
        {
            "category": "Core",
            "tracks": [
//					          {"id":"Cytoband", "disabled":false, "checked":true},
                {"id": "Sequence", "disabled": false, "checked": true},
                {"id": "Gene/Transcript", "disabled": false, "checked": true},
                {"id": "CpG islands", "disabled": true, "checked": false}
            ]
        },
        {
            "category": "Variation",
            "tracks": [
                {"id": "SNP", "disabled": false, "checked": true},
                {"id": "EBI EVA 1.0 SNVs", "disabled": false, "checked": false},
                //{"id": "Mutation", "disabled": false, "checked": true},
                {"id": "Structural variation (<20Kb)", "disabled": true, "checked": false},
                {"id": "Structural variation (>20Kb)", "disabled": true, "checked": false}
            ]
        },
        {
            "category": "Regulatory",
            "tracks": [
                {"id": "TFBS", "disabled": false, "checked": false},
                {"id": "miRNA targets", "disabled": false, "checked": false},
//			                  {"id":"Histone", "disabled":false, "checked":false},
//			                  {"id":"Polymerase", "disabled":false, "checked":false},
//			                  {"id":"Open Chromatin", "disabled":true, "checked":false},
                {"id": "Conserved regions", "disabled": false, "checked": false}
            ]
        }
    ],
    "group2": [
        {
            "category": "Core",
            "tracks": [
//					          {"id":"Cytoband", "disabled":false, "checked":true},
                {"id": "Sequence", "disabled": false, "checked": true},
                {"id": "Gene/Transcript", "disabled": false, "checked": true},
                {"id": "CpG islands", "disabled": true, "checked": false}
            ]
        },
        {
            "category": "Variation",
            "tracks": [
                {"id": "SNP", "disabled": true, "checked": true},
                {"id": "Mutation", "disabled": true, "checked": false},
                {"id": "Structural variation (<20Kb)", "disabled": true, "checked": false},
                {"id": "Structural variation (>20Kb)", "disabled": true, "checked": false}
            ]
        },
        {
            "category": "Regulatory",
            "tracks": [
                {"id": "TFBS", "disabled": true, "checked": false},
                {"id": "miRNA targets", "disabled": true, "checked": false},
                {"id": "Histone", "disabled": true, "checked": false},
                {"id": "Polymerase", "disabled": true, "checked": false},
                {"id": "Open Chromatin", "disabled": true, "checked": false},
                {"id": "Conserved regions", "disabled": true, "checked": false}
            ]
        }
    ],
    "group3": [
        {
            "category": "Core",
            "tracks": [
//					          {"id":"Cytoband", "disabled":false, "checked":true},
                {"id": "Sequence", "disabled": false, "checked": true},
                {"id": "Gene/Transcript", "disabled": false, "checked": true},
                {"id": "CpG islands", "disabled": true, "checked": false}
            ]
        },
        {
            "category": "Variation",
            "tracks": [
                {"id": "SNP", "disabled": true, "checked": false},
                {"id": "Mutation", "disabled": true, "checked": false},
                {"id": "Structural variation (<20Kb)", "disabled": true, "checked": false},
                {"id": "Structural variation (>20Kb)", "disabled": true, "checked": false}
            ]
        },
        {
            "category": "Regulatory",
            "tracks": [
                {"id": "TFBS", "disabled": true, "checked": false},
                {"id": "miRNA targets", "disabled": true, "checked": false},
                {"id": "Histone", "disabled": true, "checked": false},
                {"id": "Polymerase", "disabled": true, "checked": false},
                {"id": "Open Chromatin", "disabled": true, "checked": false},
                {"id": "Conserved regions", "disabled": true, "checked": false}
            ]
        }
    ]
};

var DAS_TRACKS = [
    {
        "species": "hsapiens",
        "categories": [
            {
                "name": "Core",
                "sources": [
                    {
                        "name": "GRC Region GRCh37",
                        "url": "http://das.sanger.ac.uk/das/grc_region_GRCh37/features",
                        "checked": false
                    },
                    {
                        "name": "Vega genes",
                        "url": "http://das.sanger.ac.uk/das/vega_ens_zv8_genes/features",
                        "checked": false
                    }
                ]
            },
            {
                "name": "Variation",
                "sources": [
                    {
                        "name": "Cosmic Mutations GRCh37",
                        "url": "http://das.sanger.ac.uk/das/cosmic_mutations_GRCh37/features",
                        "checked": false
                    }
                ]
            },
            {
                "name": "Regulatory",
                "sources": []
            }
        ]
    },
    {
        "species": "mmusculus",
        "categories": [
            {
                "name": "Core",
                "sources": []
            },
            {
                "name": "Variation",
                "sources": []
            },
            {
                "name": "Regulatory",
                "sources": [
                    {
                        "name": "miRNAs",
                        "url": "http://www.ebi.ac.uk/das-srv/genomicdas/das/mmuprimiRNA/",
                        "checked": false
                    }
                ]
            }
        ]
    },
    {
        "species": "drerio",
        "categories": [
            {
                "name": "Core",
                "sources": []
            },
            {
                "name": "Variation",
                "sources": []
            },
            {
                "name": "Regulatory",
                "sources": []
            }
        ]
    },
    {
        "species": "rnorvegicus",
        "categories": [
            {
                "name": "Core",
                "sources": []
            },
            {
                "name": "Variation",
                "sources": []
            },
            {
                "name": "Regulatory",
                "sources": [
                    {
                        "name": "miRNAs",
                        "url": "http://www.ebi.ac.uk/das-srv/genomicdas/das/rnoprimiRNA/",
                        "checked": false
                    }
                ]
            }
        ]
    },
    {
        "species": "dmelanogaster",
        "categories": [
            {
                "name": "Core",
                "sources": []
            },
            {
                "name": "Variation",
                "sources": []
            },
            {
                "name": "Regulatory",
                "sources": []
            }
        ]
    },
    {
        "species": "scerevisiae",
        "categories": [
            {
                "name": "Core",
                "sources": []
            },
            {
                "name": "Variation",
                "sources": []
            },
            {
                "name": "Regulatory",
                "sources": []
            }
        ]
    },
    {
        "species": "celegans",
        "categories": [
            {
                "name": "Core",
                "sources": []
            },
            {
                "name": "Variation",
                "sources": []
            },
            {
                "name": "Regulatory",
                "sources": []
            }
        ]
    }
];
