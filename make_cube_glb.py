import struct
import json

def create_cube_glb(filepath):
    # Cube 8 vertices (x, y, z)
    vertices = [
        -0.5, -0.5,  0.5,
         0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,
        -0.5,  0.5,  0.5,
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,
        -0.5,  0.5, -0.5
    ]

    # 12 triangles (36 indices)
    indices = [
        # Front
        0, 1, 2,  2, 3, 0,
        # Right
        1, 5, 6,  6, 2, 1,
        # Back
        5, 4, 7,  7, 6, 5,
        # Left
        4, 0, 3,  3, 7, 4,
        # Top
        3, 2, 6,  6, 7, 3,
        # Bottom
        4, 5, 1,  1, 0, 4
    ]

    positions_bytes = struct.pack(f'{len(vertices)}f', *vertices)
    indices_bytes = struct.pack(f'{len(indices)}H', *indices)

    # Align to 4-byte boundaries
    positions_padding = (4 - (len(positions_bytes) % 4)) % 4
    positions_bytes += b'\x00' * positions_padding

    indices_padding = (4 - (len(indices_bytes) % 4)) % 4
    indices_bytes += b'\x00' * indices_padding

    buffer_data = positions_bytes + indices_bytes

    min_x, max_x = -0.5, 0.5
    min_y, max_y = -0.5, 0.5
    min_z, max_z = -0.5, 0.5

    gltf = {
        "asset": {"version": "2.0", "generator": "CubeGenerator"},
        "scenes": [{"nodes": [0]}],
        "nodes": [{"mesh": 0, "name": "Cube"}],
        "meshes": [{
            "name": "CubeMesh",
            "primitives": [{
                "attributes": {"POSITION": 0},
                "indices": 1,
                "mode": 4
            }]
        }],
        "accessors": [
            {
                "bufferView": 0,
                "byteOffset": 0,
                "componentType": 5126, # FLOAT
                "count": 8,
                "type": "VEC3",
                "max": [max_x, max_y, max_z],
                "min": [min_x, min_y, min_z]
            },
            {
                "bufferView": 1,
                "byteOffset": 0,
                "componentType": 5123, # UNSIGNED_SHORT
                "count": 36,
                "type": "SCALAR",
                "max": [7],
                "min": [0]
            }
        ],
        "bufferViews": [
            {
                "buffer": 0,
                "byteOffset": 0,
                "byteLength": len(positions_bytes),
                "target": 34962 # ARRAY_BUFFER
            },
            {
                "buffer": 0,
                "byteOffset": len(positions_bytes),
                "byteLength": len(indices_bytes),
                "target": 34963 # ELEMENT_ARRAY_BUFFER
            }
        ],
        "buffers": [{
            "byteLength": len(buffer_data)
        }]
    }

    json_str = json.dumps(gltf)
    json_bytes = json_str.encode('utf-8')
    json_padding = (4 - (len(json_bytes) % 4)) % 4
    json_bytes += b' ' * json_padding

    # Header: Magic (4B), Version (4B), Total Length (4B)
    # JSON Chunk: Length (4B), Type (0x4E4F534A), Data
    # BIN Chunk: Length (4B), Type (0x004E4942), Data
    json_chunk_header = struct.pack('<II', len(json_bytes), 0x4E4F534A)
    bin_chunk_header = struct.pack('<II', len(buffer_data), 0x004E4942)

    total_len = 12 + 8 + len(json_bytes) + 8 + len(buffer_data)
    header = struct.pack('<4sII', b'glTF', 2, total_len)

    with open(filepath, 'wb') as f:
        f.write(header)
        f.write(json_chunk_header)
        f.write(json_bytes)
        f.write(bin_chunk_header)
        f.write(buffer_data)

    print(f"Created GLB cube at {filepath} ({total_len} bytes)")

if __name__ == "__main__":
    create_cube_glb("sample_cube.glb")
