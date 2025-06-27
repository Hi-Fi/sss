import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import PropTypes from 'prop-types';


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

class LeafletSongsList extends Component {

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    this.props.reorderSelectedSongs(result.source.index, result.destination.index)
  }

  render() {
    const { songs } = this.props;

    return (
      <div className="container">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {songs.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {song.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

LeafletSongsList.propTypes = {
  reorderSelectedSongs: PropTypes.func,
  songs: PropTypes.array,
}

export default LeafletSongsList;
